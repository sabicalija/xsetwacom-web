<template>
  <div class="home">
    <h1>Home</h1>
    <h2>Screen</h2>
    <MapToOutput />
    <h2>Devices</h2>
    <Devices />
  </div>
</template>

<script>
import Devices from "@/components/Devices.vue";
import MapToOutput from "@/components/MapToOutput.vue";

export default {
  name: "Home",
  components: { Devices, MapToOutput },
};
</script>

<style lang="stylus" scoped>
h1
  display none
  font-size 1.4rem
h1, h2
  font-size 1rem
  text-align center
  margin 0.5rem auto 0.25rem
</style>
