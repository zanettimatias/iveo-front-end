<template>
  <AbsoluteLayout :width="buttonWidth" :height="buttonHeight">
    <Label :width="buttonWidth" :height="buttonHeight" class="circle" />
    <Label
      :top="buttonHeight / 2 / 2"
      :text="label"
      :width="buttonWidth"
      :height="buttonHeight / 2"
      class="texto"
      @loaded="onLabelLoaded"
    />
  </AbsoluteLayout>
</template>
<script>
import { Label } from "@nativescript/core/ui/label";
import { isAndroid } from "@nativescript/core/platform";
export default {
  name: "ActionButton",
  props: {
    label: {
      default: "",
    },
    buttonWidth: {
      default: 120,
    },
    buttonHeight: {
      default: 120,
    },
  },
  methods: {
    doLoad() {
      this.checked = this.initialChecked;
    },
    onLabelLoaded(label) {
      const lbl = label.object;
      if (isAndroid) {
        lbl.android.setGravity(17);
      }
    },
  },
};
</script>
<style scoped>
.circle {
  background: rgb(255, 255, 255);
  text-align: center;
  animation-name: pulse;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  border-radius: 100;
}

@keyframes pulse {
  0% {
    transform: scale(0.95); /* scaling to 0 */
  }
  50% {
    transform: scale(1); /* increasing the size */
  }
  100% {
    transform: scale(0.95); /* seeting back to initial size */
  }
}
.texto {
  text-align: center;
  font-size: 15;
  margin-left: 2;
  margin-right: 2;
}
</style>