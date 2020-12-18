<template>
  <li @click="onClick">
    <DeviceIcon :type="type" />
    <span>{{ name }}</span>
    <!-- <span>{{ deviceId }}</span> -->
  </li>
</template>

<script>
import DeviceIcon from "@/components/DeviceIcon.vue";
export default {
  name: "Device",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: { DeviceIcon },
  data() {
    return {
      deviceId: 0,
      name: "",
      type: "",
    };
  },
  methods: {
    onClick() {
      this.$router.push({ name: "device", params: { id: this.deviceId } });
    },
  },
  created() {
    const { id, name, type } = this.$store.getters.getDevice(this.id);
    this.deviceId = id;
    this.name = name;
    this.type = type;
  },
};
</script>

<style lang="stylus" scoped>
@import "~@/style/palette.styl";
li
  cursor pointer
  display flex
  flex-flow row nowrap
  padding 1rem 0.5rem
  border-radius 0.25rem
  border 1px solid $accentColor
  box-shadow 2px 1px 2px 1px lighten($accentColor, 20%)
  margin-top 1rem
  font-size 1.4rem
  & > *
    padding 0.5rem 1rem
</style>
