<template>
  <AbsoluteLayout :width="iconWidth" :height="iconWidth">
    <Label :width="iconWidth" :height="iconWidth" class="info" />
    <Label
      :top="iconWidth / 2 / 2"
      :text="label"
      :width="iconWidth"
      :height="iconWidth / 2"
      @loaded="onLabelLoaded"
      class="texto"
    >
      <FormattedString>
        <Span :fontSize="iconWidth / 4.5" text="i" class="i" />
        <Span :fontSize="iconWidth / 4" text="V" class="v" />
        <Span :fontSize="iconWidth / 4" text="E" class="e" />
        <Span :fontSize="iconWidth / 4" text="O" class="o" />
      </FormattedString>
    </Label>
  </AbsoluteLayout>
</template>
<script>
import { Label } from "@nativescript/core/ui/label";
import { isAndroid } from "@nativescript/core/platform";
export default {
  name: "Icon",
  props: {
    label: {
      default: "",
    },
    iconWidth: {
      default: 180,
    },
    iconheight: {
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
  font-size: 60;
  margin-left: 2;
  margin-right: 2;
}
.i {
  color: rgb(59, 139, 214);
}
.v {
  color: whitesmoke;
}
.e {
  color: #ffffff;
  font-weight: 600;
}
.o {
  font-weight: 800;
  color: whitesmoke;
}

.info {
  font-size: 60;
  background-color: rgba(255, 255, 255, 0.165);
  horizontal-align: center;
  vertical-align: center;
  text-align: center;
  border-radius: 100;
  animation-name: pulse;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
}
</style>