<template>
  <li>
    <label :for="`option-${name}`">{{ name }}</label>
    <span :id="`option-${name}`">{{ value }} </span>
  </li>
</template>

<script>
export default {
  name: "DeviceOption",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
li
  display flex
  flex-flow row nowrap
  justify-content space-between
  & > *
    padding 0.5rem 1rem
</style>
