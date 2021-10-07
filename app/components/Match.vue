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
        <GridLayout height="100%" width="100%">
          <FlexboxLayout flexDirection="column" justifyContent="flex-end">
            <Image
              :src="imagePath"
              width="50"
              height="50"
              v-if="showThumbnail"
              class="roundedImage"
            />
          </FlexboxLayout>
        </GridLayout>
      </GridLayout>
      <GesturePanel
        btnLabel="Escaneando objeto.."
        @longPress="startCapture"
        @swipeRight="swipeRight"
        @doubleTap="doubleTap"
      />
    </GridLayout>
  </Page>
</template>

<script>
import ActionButton from "~/components/ActionButton.vue";
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import { SpeakService } from "~/services/SpeakService";
import AddNewData from "~/components/AddNewData";
import { Indications } from "~/services/locale/indications-es";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";
import Home from "@/components/Home";
import personality from "~/services/Personality";
import SignIn from "~/components/SignIn.vue";

const indicator = new LoadingIndicator();

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
    showThumbnail: false,
    imagenes: [],
    imagen: null,
    blockLongPress: false
  }),
  mounted() {},
  methods: {
    async showThumbnailAsync() {
      this.showThumbnail = true;
      setTimeout(() => (this.showThumbnail = false), 1500);
    },
    async onLoaded() {
      this.$yoo.camera.registerElement(this.$refs.yooCamera);
      await this.doPreview();
    },
    async doPreview() {
      if (await this.$yoo.camera.requestPermission()) {
        console.log("[YooCamera] Permission granted, start preview");
        this.$yoo.camera.preview();
        SpeakService.speak(Indications.MATCHINICIAR);
      }
    },
    startCapture() {
      if (!this.blockLongPress) {
        this.imagenes = [];
        this.$yoo.camera.startCapture("frame");
        this.blockLongPressButton();
      }
    },
    async blockLongPressButton() {
      this.blockLongPress = true;
      await new Promise(resolve => setTimeout(resolve, 4000));
      this.blockLongPress = false;
    },
    stopCapture() {
      this.$yoo.camera.stopCapture();
      this.doEndCapture();
    },
    doImageCaptured({
      type,
      count,
      total,
      image: { path, source },
      inferences,
      darkness,
      lightness,
      sharpness
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
      this.imagen = path;
      this.imagenes.push({ path: path, source: source });
    },
    doEndCapture() {
      SpeakService.speak(Indications.MATCHPROGRESS).then(() => {
        HttpService.match(this.multiPartFileFactory())
          .then(e => {
            if (e.data !== "[]") {
              let data = JSON.parse(e.data);
              SpeakService.speak(personality.getFrase(data[0]));
            } else {
              SpeakService.speak(Indications.MATCHFAILED);
            }
          })
          .catch(err => {
            SpeakService.speak(Indications.ADDNEWPRODUCTOERROR);
            console.log(err);
          });
      });
    },
    multiPartFileFactory() {
      let multipartFiles = [];
      multipartFiles.push(...this.filesFactory());
      return multipartFiles;
    },
    filesFactory() {
      let files = [];
      this.imagenes.forEach(element => {
        files.push({
          name: "files",
          filename: element.path,
          mimeType: "image/jpeg"
        });
      });
      return files;
    },
    swipeRight() {
      if (this.$store.user == null) {
        this.$navigateTo(SignIn, {
          transition: {
            name: "slideRight",
            duration: 200,
            curve: "easeIn"
          }
        });
      } else {
        this.$navigateTo(Home, {
          transition: {
            name: "slideRight",
            duration: 200,
            curve: "easeIn"
          }
        });
      }
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #000000;
  color: #ffffff;
}
label {
  font-size: 14;
  color: #ffffff;
}
button {
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
.roundedImage {
  border-radius: 100;
}
</style>
