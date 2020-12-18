<template>
  <font-awesome-icon
    :icon="mapping[type.toLowerCase()].icon"
  ></font-awesome-icon>
</template>

<script>
export default {
  name: "DeviceIcon",
  props: {
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return (
          ["stylus", "eraser", "pad", "touch", "cursor"].indexOf(
            value.toLowerCase()
          ) !== -1
        );
      },
    },
  },
  data() {
    return {
      mapping: {
        stylus: {
          icon: ["fas", "pen"],
        },
        pad: {
          icon: ["fas", "tablet"],
        },
        touch: {
          icon: ["fas", "fingerprint"],
        },
        eraser: {
          icon: ["fas", "eraser"],
        },
        cursor: {
          icon: ["fas", "mouse-pointer"],
        },
      },
    };
  },
};
</script>

<style lang="stylus" scoped></style>
