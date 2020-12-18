<template>
  <div>
    <label :for="`option-${name}`">{{ name }}</label>
    <span :id="`option-${name}`">{{ value }} </span>
  </div>
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

<style lang="stylus" scoped></style>
