<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />
    <GridLayout height="100%" width="100%" ref="all">
      <GridLayout height="100%" width="100%" ref="camera">
        <YoonitCamera
          ref="yooCamera"
          :torch="enableTorch"
          :lens="cameraLens"
          :captureType="captureType"
          :computerVision="true"
          :detectionBox="enableDetectionBox"
          :detectionBoxColor="enableDetectionBoxColor ? '#FF0000' : '#FFFFFF'"
          :faceContours="enableFaceContours"
          :faceContoursColor="enableFaceContoursColor ? '#FF0000' : '#FFFFFF'"
          :detectionMinSize="enableDetectionMinSize ? '70%' : '0%'"
          :detectionMaxSize="enableDetectionMaxsize ? '80%' : '100%'"
          :roi="enableROI"
          :roiAreaOffset="true"
          :roiAreaOffsetColor="enableROIAreaOffsetColor ? '#FF0000' : '#FFFFFF'"
          :roiTopOffset="'10%'"
          :roiRightOffset="'10%'"
          :roiBottomOffset="'10%'"
          :roiLeftOffset="'10%'"
          :imageCapture="enableImageCapture"
          :imageCaptureAmount="1"
          :imageCaptureInterval="300"
          @imageCaptured="doImageCaptured"
          @endCapture="doEndCapture"
          @status="doStatus"
          @permissionDenied="doPermissionDenied"
        />
        <GridLayout
          height="100%"
          width="100%"
      >
        <FlexboxLayout
            flexDirection="column"
            justifyContent="flex-end"
        >
          <Image
              :src="imagePath"
              width="200"
              height="200"
              v-if="showThumbnail"
          />
        </FlexboxLayout>
      </GridLayout>
      </GridLayout>
      <GesturePanel @longPress="longPress" btnLabel="test" />
    </GridLayout>
  </Page>
</template>

<script>
import { knownFolders, path, isAndroid } from "@nativescript/core";
import ActionButton from "~/components/ActionButton.vue";
import GesturePanel from "~/components/GesturePanel.vue";

export default {
  components: { ActionButton, GesturePanel },
  data: () => ({
    panel: "analysis",
    cameraLens: "back",
    captureType: "none",
    enableCamera: true,
    enableTorch: false,
    enableImageCapture: true,
    enableROI: false,
    enableROIAreaOffsetColor: false,
    imagePath: null,
    showThumbnail: false
  }),

  methods: {
    async showThumbnailAsync() {
      this.showThumbnail=true;
      setTimeout(() => this.showThumbnail = false, 1500);
    },
    async onLoaded() {
      this.$yoo.camera.registerElement(this.$refs.yooCamera);
      await this.doPreview();
    },
    async doPreview() {
      if (await this.$yoo.camera.requestPermission()) {
        console.log("[YooCamera] Permission granted, start preview");
        this.$yoo.camera.preview();
      }
    },
    longPress() {
      this.$yoo.camera.startCapture("frame");
    },
    doImageCaptured({
      type,
      count,
      total,
      image: { path, source },
      inferences,
      darkness,
      lightness,
      sharpness,
    }) {
      if (total === 0) {
        console.log(
          "[YooCamera] doImageCaptured",
          `${type}: [${count}] ${path}`
        );
        this.imageInformationCaptured = `${count}`;
      } else {
        console.log(
          "[YooCamera] doImageCaptured",
          `${type}: [${count}] of [${total}] - ${path}`
        );
        this.imageInformationCaptured = `${count} de ${total}`;
      }
      this.imageDarkness = parseFloat(darkness).toFixed(4);
      this.imageLightness = parseFloat(lightness).toFixed(4);
      this.imageSharpness = parseFloat(sharpness).toFixed(4);
      this.imagePath = source;
      this.showThumbnailAsync();
    },
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #000000;
  color: #ffffff;
}
Label {
  font-size: 14;
  color: #ffffff;
}
Button {
  padding: 8 12;
  color: #333333;
  background-color: lightgray;
  border-radius: 8;
  margin: 8 0 8 12;
}
.selected {
  color: white;
  background-color: #9b9b9b;
}
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>