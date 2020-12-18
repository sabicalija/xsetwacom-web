<template>
  <ul v-if="ready">
    <DeviceOption
      v-for="(value, key, index) in device.options"
      :key="index"
      :name="key"
      :value="value"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import DeviceOption from "@/components/DeviceOption.vue";
export default {
  name: "DeviceOptions",
  components: { DeviceOption },
  computed: {
    ...mapState(["devices", "ready"]),
    device() {
      return this.devices.find(({ id }) => id === this.$attrs.id);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "~@/style/palette.styl";

ul
  list-style-type none
  padding-left unset
  width fit-content
  min-width 500px
  margin auto
  display flex
  flex-flow column nowrap
  border 0.125rem solid $accentColor
  border-radius 0.25rem
  box-shadow 3px 2px 5px 1px darken($accentColor,50%)
</style>
