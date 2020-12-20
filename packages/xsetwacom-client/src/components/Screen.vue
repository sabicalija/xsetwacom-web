<template>
  <li tabindex="0" @click="onClick" @keydown.enter.space.prevent="onClick">
    <span :class="{ active }" :style="style"> Screen {{ number }} </span>
    <ul v-if="multi" class="devices">
      <li v-for="(device, index) of setDevices" :key="index">{{ device }}</li>
    </ul>
  </li>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Screen",
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: false,
      setDevices: [],
    };
  },
  computed: {
    ...mapState(["ready", "devices"]),
    ...mapGetters(["getMapOutput"]),
    multi() {
      return typeof this.$route.params.id === "undefined";
    },
    style() {
      return {
        width: `${this.width / this.scale}px`,
        height: `${this.height / this.scale}px`,
        top: `${(this.offset - this.height) / this.scale}px`,
        lineHeight: `${this.height / this.scale}px`,
      };
    },
  },
  methods: {
    ...mapActions(["mapToOutput"]),
    async onClick() {
      const { id } = this.$route.params;
      if (id) this.mapToOutput({ id, output: "desktop" });
      else {
        for (const id of this.devices.map(({ id }) => id)) {
          await this.mapToOutput({ id, output: "desktop" });
        }
      }
    },
    loadSetDevices() {
      this.active = false;
      this.setDevices = this.devices
        .filter(({ output }) => output === "desktop")
        .map(({ name }) => name);
    },
    updateOutput() {
      const { id } = this.$route.params;
      if (id) this.active = this.getMapOutput(Number(id)) === "desktop";
      else this.loadSetDevices();
    },
  },
  watch: {
    ready() {
      this.updateOutput();
    },
  },
  mounted() {
    this.updateOutput();
  },
  created() {
    this.updateOutput();
  },
};
</script>

<style lang="stylus" scoped>
@import "~@/style/palette.styl";
li span
  cursor pointer
  background-color lighten($accentColor, 30%)
  color white
  font-size 1.6rem
  display table-cell
  text-align center
  &:hover, &:focus
    z-index 20
    background-color lighten($accentColor, 10%)
    outline 0.25rem solid lightgreen
</style>
