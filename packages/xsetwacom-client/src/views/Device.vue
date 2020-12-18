<template>
  <div v-if="device">
    <h1>{{ device.name }}</h1>
    <DeviceOptions :options="device.options" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeviceOptions from "@/components/DeviceOptions.vue";
export default {
  name: "Device",
  components: { DeviceOptions },
  data() {
    return {
      device: null,
    };
  },
  computed: {
    ...mapGetters(["getDevice"]),
  },
  mounted() {
    this.device = this.getDevice(this.$attrs.id);
  },
};
</script>

<style lang="stylus" scoped>
h1
  text-align center
</style>
