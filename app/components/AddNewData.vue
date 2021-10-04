<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />
    <GesturePanel
      btnLabel="Escaneando objeto..."
      @longPressStart="startCapture"
      @longPressStop="stopCapture"
      @longPress="doSave"
      @swipe="swipe"
    >
      <StackLayout ref="form" class="formulario" height="100%" width="100%" >
        <Label
          :text="indicactions.COMPLETARFORMULARIO"
          textWrap="true"
          textAlignment="left"
          class="titulo"
          marginLeft="15"
          marginTop="15"
        />
        <TextField v-model="marca" hint="Modelo" />
        <TextField v-model="modelo" hint="Modelo" />
        <TextField v-model="material" hint="Material" />
        <TextField v-model="envase" hint="Envase" />
        <TextField v-model="contenido" hint="Contenido" />
        <TextField v-model="color" hint="Color, si aplica" />
        <TextField
          v-model="descripcion"
          hint="Complete una descripción que identifique al objeto"
        />
        <WrapLayout class="imagenesLayout">
          <Image
            v-for="image in imagenes"
            v-bind:key="image"
            class="thumbnail"
            stretch="fill"
            :src="image.source"
            width="100"
            height="100"
          />
        </WrapLayout>
      </StackLayout>
    </GesturePanel>
  </Page>
</template>

<script>
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import AddNewCameraVue from "~/components/AddNewCamera.vue";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";

const indicator = new LoadingIndicator();

export default {
  name: "AddNewData",
  components: { GesturePanel },
  props: {
    imagenes: Object,
  },
  data() {
    return {
      marca: "",
      material: "",
      envase: "",
      descripcion: "",
      color: "",
      contenido: "",
      modelo: "",
      indicactions: Indications,
    };
  },
  mounted() {
    SpeakService.speak(Indications.COMPLETARFORMULARIO);
  },
  methods: {
    doSave() {
      indicator.show({ message: Indications.ADDNEWPRODUCTOPROGRESS, dimBackground: true });
      SpeakService.speak(Indications.ADDNEWPRODUCTOPROGRESS);
      HttpService.newProductoTestMulti(this.multiPartFileFactory())
        .then((e) => {
          indicator.hide();
          SpeakService.speak(Indications.ADDNEWPRODUCTOSUCESS);
          this.back();
        })
        .catch((err) => {
          indicator.hide();
          SpeakService.speak(Indications.ADDNEWPRODUCTOERROR);
          console.log(err);
        });
    },
    multiPartFileFactory() {
      let multipartFiles = [];
      multipartFiles.push(...this.formDataFactory());
      multipartFiles.push(...this.filesFactory());
      return multipartFiles;
    },
    filesFactory() {
      let files = [];
      this.imagenes.forEach((element) => {
        files.push({
          name: "files",
          filename: element.path,
          mimeType: "image/jpeg",
        });
      });
      return files;
    },
    formDataFactory() {
      let data = [];
      if (this.marca) data.push({ name: "marca", value: this.marca });
      if (this.material) data.push({ name: "material", value: this.material });
      if (this.envase) data.push({ name: "envase", value: this.envase });
      if (this.descripcion)
        data.push({ name: "descripcion", value: this.descripcion });
      if (this.color) data.push({ name: "color", value: this.color });
      if (this.contenido)
        data.push({ name: "contenido", value: this.contenido });
      if (this.modelo) data.push({ name: "modelo", value: this.modelo });
      return data;
    },
    swipe(event) {
      if (event.direction == "1") this.back();
    },
    back() {
      this.$navigateTo(AddNewCameraVue, {
        transition: {
          name: "slideRight",
          duration: 200,
          curve: "easeIn",
        },
      });
    }
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
.roundedImage {
  border-radius: 100;
}
.formulario {
  background-color: white;
}
.titulo {
  color: #333333;
  font-size: 16;
  font-weight: 700;
}
.thumbnail {
  background-color: aqua;
  border-radius: 80;
}
.imagenesLayout {
  margin-top: 15;
  margin-left: 15;
}
</style>