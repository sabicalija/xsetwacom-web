<template>
  <ul>
    <Screen
      v-for="(screen, index) of screens"
      :key="index"
      :width="screen.width"
      :height="screen.height"
      :number="screen.screen"
      :scale="scale"
      :offset="offset"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import Screen from "@/components/Screen.vue";
export default {
  name: "Screens",
  components: { Screen },
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
    ...mapState(["screens"]),
  },
};
</script>

<style lang="stylus" scoped>
ul
  z-index 1
  list-style-type none
  padding-left unset
  width fit-content
  margin auto
  top 0px
  &, & > li
    position absolute
</style>
