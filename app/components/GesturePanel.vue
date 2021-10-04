<template>
  <AbsoluteLayout
    ref="gestureLayout"
    @longPress="longPress"
    v-if="!prevented"
    @touch="onTouch"
    height="100%"
    width="100%"
    @swipe="swipe"
  >
    <slot />
    <ActionButton
      :label="btnLabel"
      :top="buttonTop"
      :left="buttonLeft"
      :buttonHeight="buttonHeight"
      :buttonWidth="buttonWidth"
      v-show="mostrarBoton"
    />
  </AbsoluteLayout>
</template>
<script>
import ActionButton from "~/components/ActionButton.vue";
import { Screen } from "@nativescript/core/platform";

const xBottomOriginal = Screen.mainScreen.widthDIPs;
const yBottomOriginal = Screen.mainScreen.heightDIPs;

export default {
  name: "GesturePanel",
  mounted() {},
  data() {
    return {
      buttonTop: 0,
      buttonLeft: 0,
      buttonHeight: 180,
      buttonWidth: 180,
      mostrarBoton: false,
    };
  },
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
    onTouch(e) {
      let x, y;
      if (e.action == "down") {
        this.$emit("longPressStart", true);
      }
      if (e.action == "up") {
        this.$emit("longPressStop", true);
      }
      if (e.action == "down" || e.action == "move") {
        this.mostrarBoton = true;
        x = e.getX() - this.buttonWidth / 2;
        y = e.getY() - this.buttonHeight / 2;
      } else {
        this.mostrarBoton = false;
      }
      this.buttonLeft = x;
      this.buttonTop = y;
    },
    swipe(event) {
      this.$emit("swipe", event);
    },
    longPress() {
      this.$emit("longPress");
    },
  },
};
</script>
<style scoped>
</style>