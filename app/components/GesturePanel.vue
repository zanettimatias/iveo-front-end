<template>
  <AbsoluteLayout @longPress="longPress" v-if="!prevented">
    <ActionButton :label="btnLabel" top="1" left="1" />
  </AbsoluteLayout>
</template>
<script>
import ActionButton from "~/components/ActionButton.vue";
export default {
  name: "GesturePanel",
  components: { ActionButton },
  props: {
    btnLabel: {
      default: "",
    },
    prevented: {
      default: false,
    },
  },
  methods: {
    longPress() {
      this.$emit("longPress");
    },
  },
};
</script>
<style scoped>
</style>