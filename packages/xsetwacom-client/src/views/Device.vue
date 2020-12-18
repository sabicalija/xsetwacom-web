<template>
  <div v-if="device">
    <h1>{{ device.name }}</h1>
    <MapToOutput />
    <DeviceOptions :id="this.$attrs.id" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapToOutput from "@/components/MapToOutput.vue";
import DeviceOptions from "@/components/DeviceOptions.vue";
export default {
  name: "Device",
  components: { MapToOutput, DeviceOptions },
  computed: {
    ...mapState(["devices"]),
    device() {
      return this.devices.find(({ id }) => id === this.$attrs.id);
    },
  },
};
</script>

<style lang="stylus" scoped>
h1
  text-align center
</style>
