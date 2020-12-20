<template>
  <li tabindex="0" @click="onClick" @keydown.enter.space.prevent="onClick">
    <span :class="{ active }" :style="style">{{ name }} </span>
    <ul
      v-if="multi"
      class="devices display"
      :style="{
        bottom: `-${this.height / this.scale}px`,
        left: `${x / this.scale}px`,
      }"
    >
      <li v-for="(device, index) of setDevices" :key="index">{{ device }}</li>
    </ul>
  </li>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Display",
  props: {
    head: {
      type: String,
      requied: true,
    },
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    primary: {
      type: Boolean,
      require: true,
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
    yOffset() {
      return this.data;
    },
    multi() {
      return typeof this.$route.params.id === "undefined";
    },
    style() {
      return {
        width: `${this.width / this.scale}px`,
        height: `${this.height / this.scale}px`,
        left: `${this.x / this.scale}px`,
        lineHeight: `${this.height / this.scale}px`,
      };
    },
  },
  methods: {
    ...mapActions(["mapToOutput"]),
    async onClick() {
      let { id } = this.$route.params;
      if (id) this.mapToOutput({ id, output: this.head });
      else {
        for (const id of this.devices.map(({ id }) => id)) {
          await this.mapToOutput({ id, output: this.head });
        }
      }
    },
    loadSetDevices() {
      this.active = false;
      this.setDevices = this.devices
        .filter(({ output }) => output === this.head)
        .map(({ name }) => name);
    },
    updateOutput() {
      const { id } = this.$route.params;
      if (id) this.active = this.getMapOutput(Number(id)) === this.head;
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
};
</script>

<style lang="stylus" scoped>
li span
  cursor pointer
  background-color darken(gray,30%)
  color white
  font-size 1.4rem
  opacity 0.65
  font-size 1.6rem
  display table-cell
  text-align center
  position absolute
  &:hover, &:focus
    opacity 1
    z-index 10
    background-color darken(gray,10%)
    outline 0.25rem solid lightgreen
</style>
