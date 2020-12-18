<template>
  <ul>
    <DeviceOption
      v-for="(value, key, index) in options"
      :key="index"
      :name="key"
      :value="value"
    />
  </ul>
</template>

<script>
import DeviceOption from "@/components/DeviceOption.vue";
export default {
  name: "DeviceOptions",
  components: { DeviceOption },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped></style>
