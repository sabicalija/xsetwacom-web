<template>
  <div class="home">
    <h1>Devices</h1>
    <Devices />
  </div>
</template>

<script>
import Devices from "@/components/Devices.vue";

export default {
  name: "Home",
  components: {
    Devices,
  },
};
</script>

<style lang="stylus" scoped>
h1
  text-align center
</style>
