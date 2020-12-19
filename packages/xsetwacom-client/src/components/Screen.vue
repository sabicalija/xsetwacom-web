<template>
  <li
    tabindex="0"
    :class="{ active }"
    :style="{
      width: `${width / scale}px`,
      height: `${height / scale}px`,
      top: `${(offset - height) / scale}px`,
      lineHeight: `${height / scale}px`,
    }"
    @click="onClick"
    @keydown.enter.space.prevent="onClick"
  >
    Screen {{ number }}
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
    };
  },
  computed: {
    ...mapState(["ready"]),
    ...mapGetters(["getMapOutput"]),
  },
  methods: {
    ...mapActions(["mapToOutput"]),
    onClick() {
      const { id } = this.$route.params;
      this.mapToOutput({ id, output: "desktop" });
    },
    updateOutput() {
      const { id } = this.$route.params;
      this.active = this.getMapOutput(Number(id)) === "desktop";
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
@import "~@/style/palette.styl";

li
  cursor pointer
  background-color lighten($accentColor, 30%)
  color white
  font-size 1.6rem
  display table-cell
  text-align center
  &:hover, &:focus
    z-index 20
    background-color lighten($accentColor, 10%)
    outline 0.25rem solid lightgreen;
</style>
