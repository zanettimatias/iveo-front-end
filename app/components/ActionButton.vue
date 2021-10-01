<template>
  <AbsoluteLayout
    width="150"
    height="150"
    backgroundColor="#ff66cc"
    class="buttonBackground"
  >
    <label class="circle" :text="label" @tap="tap"></label>
  </AbsoluteLayout>
</template>
<script>
export default {
  name: "ActionButton",
  props: {
    label: {
      default: "",
    },
  },
  methods: {
    doLoad() {
      this.checked = this.initialChecked;
    },
    tap() {
      this.$emit("tap");
    },
  },
};
</script>
<style scoped>
.circle {
  background: rgba(51, 217, 178, 1);
  width: 150;
  height: 150;
  border-radius: 100;
  text-align: center;
  vertical-align: middle;
  font-size: 5;
  font-weight: 700;
}
</style>