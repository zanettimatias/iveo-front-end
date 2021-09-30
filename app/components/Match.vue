<template>
  <Page @loaded="onLoaded">
    <YoonitCamera
      ref="yooCamera"
      lens="front"
      captureType="face"
      imageCapture=true
      imageCaptureAmount=10
      imageCaptureInterval=500
      detectionBox=true
      @faceDetected="doFaceDetected"
      @imageCaptured="doImageCaptured"
      @endCapture="doEndCapture"
      @qrCodeContent="doQRCodeContent"
      @status="doStatus"
      @permissionDenied="doPermissionDenied"
    />
  </Page>
</template>

<script>
  export default {
    data: () => ({}),

    methods: {
      async onLoaded() {

        console.log('[YooCamera] Getting Camera view')
        this.$yoo.camera.registerElement(this.$refs.yooCamera)

        console.log('[YooCamera] Getting permission')
        if (await this.$yoo.camera.requestPermission()) {
          
          console.log('[YooCamera] Permission granted, start preview')
          this.$yoo.camera.preview()
        }
      },

      doFaceDetected({ 
        x, 
        y, 
        width, 
        height,
        leftEyeOpenProbability,
        rightEyeOpenProbability,
        smilingProbability,
        headEulerAngleX,
        headEulerAngleY,
        headEulerAngleZ
      }) {
        console.log(
          '[YooCamera] doFaceDetected',
          `
          x: ${x}
          y: ${y}
          width: ${width}
          height: ${height}
          leftEyeOpenProbability: ${leftEyeOpenProbability}
          rightEyeOpenProbability: ${rightEyeOpenProbability}
          smilingProbability: ${smilingProbability}
          headEulerAngleX: ${headEulerAngleX}
          headEulerAngleY: ${headEulerAngleY}
          headEulerAngleZ: ${headEulerAngleZ}
          `
        )
        if (!x || !y || !width || !height) {
          this.imagePath = null
        }
      },

      doImageCaptured({
        type,
        count,
        total,
        image: {
          path,
          source
        },
        inferences,
        darkness,
        lightness,
        sharpness
      }) {
        if (total === 0) {
          console.log('[YooCamera] doImageCreated', `${type}: [${count}] ${path}`)
          this.imageCreated = `${count}`
        } else {
          console.log('[YooCamera] doImageCreated', `${type}: [${count}] of [${total}] - ${path}`)
          this.imageCreated = `${count} de ${total}`
        }
        console.log('[YooCamera] Mask Pytorch', inferences)
        
        console.log('[YooCamera] Image Quality Darkness:', darkness)
        console.log('[YooCamera] Image Quality Lightness', lightness)
        console.log('[YooCamera] Image Quality Sharpness', sharpness)
        this.imagePath = source
      },

      doEndCapture() {
        console.log('[YooCamera] doEndCapture')
      },

      doQRCodeContent({ content }) {
        console.log('[YooCamera] doQRCodeContent', content)
      },

      doStatus({ status }) {
        console.log('[YooCamera] doStatus', status)
      },

      doPermissionDenied() {
        console.log('[YooCamera] doPermissionDenied')
      }
    }
  }
</script>