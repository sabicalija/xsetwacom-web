<template>
  <ul>
    <Display
      v-for="(display, index) of displays"
      :key="index"
      :head="display.head"
      :primary="display.primary"
      :name="display.name"
      :width="display.width"
      :height="display.height"
      :x="display.x"
      :y="display.y"
      :scale="scale"
      :offset="offset"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import Display from "@/components/Display.vue";
export default {
  name: "Displays",
  components: { Display },
  props: {
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
    ...mapState(["displays"]),
  },
};
</script>

<style lang="stylus" scoped>
ul
  z-index 2
  list-style-type none
  padding-left unset
  width fit-content
  margin auto
  top 0px
  &, & > li
    position absolute
</style>
