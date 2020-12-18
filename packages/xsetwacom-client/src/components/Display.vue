<template>
  <li
    tabindex="0"
    :style="{
      width: `${width / scale}px`,
      height: `${height / scale}px`,
      left: `${x / scale}px`,
      lineHeight: `${height / scale}px`,
    }"
  >
    {{ name }}
  </li>
</template>

<script>
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
  computed: {
    yOffset() {
      return this.data;
    },
  },
};
</script>

<style lang="stylus" scoped>
li
  cursor pointer
  background-color darken(gray,30%)
  color white
  font-size 1.4rem
  opacity 0.65
  display table-cell
  text-align center
  &:hover, &:focus
    opacity 1
    z-index 10
    background-color darken(gray,10%)
    outline 0.25rem solid lightgreen;
</style>
