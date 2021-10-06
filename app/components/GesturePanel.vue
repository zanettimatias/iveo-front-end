<template>
  <AbsoluteLayout
    ref="gestureLayout"
    @longPress="longPress"
    v-if="!prevented"
    @touch="onTouch"
    height="100%"
    width="100%"
    @swipe="swipe"
    @doubleTap="doubleTap"
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
      if (event.direction == "2") this.$emit("swipeLeft", event);
      if (event.direction == "1") this.$emit("swipeRight", event);
      if (event.direction == "4") this.$emit("swipeTop", event);
      if (event.direction == "8") this.$emit("swipeBottom", event);
    },
    longPress() {
      this.$emit("longPress");
    },
    doubleTap() {
      this.$emit("doubleTap");
    },
  },
};
</script>
<style scoped>
</style>