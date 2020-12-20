<template>
  <ul>
    <Device v-for="device of devices" :key="device.id" :id="device.id" />
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Device from "@/components/Device.vue";
export default {
  name: "Devices",
  components: { Device },
  computed: {
    ...mapState(["devices"]),
  },
  methods: {
    ...mapActions(["getDevices"]),
  },
  mounted() {
    if (this.devices.length === 0) this.getDevices();
  },
};
</script>

<style lang="stylus" scoped>
ul
  list-style-type none
  padding-left unset
  width fit-content
  margin auto
  display flex
  flex-flow column nowrap
</style>
