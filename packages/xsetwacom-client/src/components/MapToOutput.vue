<template>
  <div
    :style="{ height: `${offset / factor}px`, width: `${width / factor}px` }"
  >
    <Screens :scale="factor" :offset="offset" />
    <Displays :scale="factor" :offset="offset" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Screens from "@/components/Screens.vue";
import Displays from "@/components/Displays.vue";
export default {
  name: "MapToOutput",
  components: { Screens, Displays },
  computed: {
    ...mapState(["screens"]),
    factor() {
      if (this.screens.length === 0) return 1;
      const width = this.screens
        .map(({ width }) => width)
        .reduce((a, b) => a + b);
      return width / 500;
    },
    offset() {
      if (this.screens.length === 0) return 0;
      const maxHeight = Math.max(this.screens.map(({ height }) => height));
      return maxHeight;
    },
    width() {
      if (this.screens.length === 0) return 0;
      const maxWidth = Math.max(this.screens.map(({ width }) => width));
      return maxWidth;
    },
  },
};
</script>

<style lang="stylus" scoped>
div
  position relative
  box-shadow 1px 1px 3px 1px gray
  margin 0.25rem auto 0.5rem
</style>
