<template>
  <li
    tabindex="0"
    :style="{
      width: `${width / scale}px`,
      height: `${height / scale}px`,
      top: `${(offset - height) / scale}px`,
      lineHeight: `${height / scale}px`,
    }"
  >
    Screen {{ number }}
  </li>
</template>

<script>
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
  &:hover, &:focus, &:focus-within
    z-index 20
    background-color lighten($accentColor, 10%)
    outline 0.25rem solid lightgreen;
</style>
