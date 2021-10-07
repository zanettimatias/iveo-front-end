<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />
    <StackLayout ref="form" class="full" height="100%" width="100%">
      <Label
        :text="indicactions.COMPLETARFORMULARIO"
        textWrap="true"
        textAlignment="left"
        class="titulo"
        marginLeft="15"
        marginTop="15"
      />
      <TextField v-model="tipo" hint="Tipo de objeto o producto" />
      <TextField v-model="marca" hint="Marca" />
      <TextField v-model="modelo" hint="Modelo" />
      <TextField v-model="material" hint="Material" />
      <TextField v-model="envase" hint="Envase" />
      <TextField v-model="contenido" hint="Contenido" />
      <TextField v-model="color" hint="Color, si aplica" />
      <TextField
        v-model="descripcion"
        hint="Complete una descripción que identifique al objeto"
      />
      <ScrollView orientation="horizontal">
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
      </ScrollView>
      <Button text="Guardar" @tap="doSave" class="my-button" />
    </StackLayout>
  </Page>
</template>

<script>
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import AddNewCameraVue from "~/components/AddNewCamera.vue";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";
import Home from "~/components/Home.vue";
import SigIn from "~/components/SignIn.vue";

const indicator = new LoadingIndicator();

export default {
  name: "AddNewData",
  components: { GesturePanel },
  props: {
    imagenes: Object
  },
  data() {
    return {
      tipo: "",
      marca: "",
      material: "",
      envase: "",
      descripcion: "",
      color: "",
      contenido: "",
      modelo: "",
      indicactions: Indications
    };
  },
  methods: {
    onLoaded() {
      SpeakService.speak(Indications.COMPLETARFORMULARIO);
    },
    doSave() {
      if (this.tipo == "") {
        SpeakService.speak("Debe completar al menos el campo tipo de objeto.");
        return;
      }
      indicator.show({
        message: Indications.ADDNEWPRODUCTOPROGRESS,
        dimBackground: true
      });
      SpeakService.speak(Indications.ADDNEWPRODUCTOPROGRESS);
      HttpService.newProductoTestMulti(
        this.multiPartFileFactory(),
        this.$store.user
      )
        .then(e => {
          indicator.hide();
          this.goHome();
        })
        .catch(err => {
          if (err == 403) {
            SpeakService.speak(Indications.ADDNEWPRODUCTOSINATURRIZACION);
            indicator.hide();
            this.goSign();
          }
          if (err == 400) {
            SpeakService.speak(Indications.ERRORBADREQUEST);
            indicator.hide();
          }
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
      this.imagenes.forEach(element => {
        files.push({
          name: "files",
          filename: element.path,
          mimeType: "image/jpeg"
        });
      });
      return files;
    },
    formDataFactory() {
      let data = [];
      if (this.tipo) data.push({ name: "tipo", value: this.tipo });
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
    swipeRight(event) {
      this.back();
    },
    back() {
      this.$navigateTo(AddNewCameraVue, {
        transition: {
          name: "slideRight",
          duration: 200,
          curve: "easeIn"
        }
      });
    },
    goHome() {
      this.$navigateTo(Home, {
        transition: {
          name: "slideLeft",
          duration: 200,
          curve: "easeIn"
        }
      });
    },
    goSign() {
      this.$navigateTo(SigIn, {
        transition: {
          name: "slideLeft",
          duration: 200,
          curve: "easeIn"
        }
      });
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #000000;
  color: #ffffff;
}
TextField {
  color: white;
  placeholder-color: white;
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
.formulario {
  background-color: white;
}
.titulo {
  color: white;
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
.my-button {
  background-color: #4bd5dc;
  color: white;
  font-weight: bold;
  border-radius: 25;
  padding-top: 14;
  padding-bottom: 14;
  text-transform: uppercase;
  letter-spacing: 0.1;
  margin-bottom: 20;
  margin-top: 20;
}
.full {
  height: 100%;
  width: 100%;
  background-color: black;
}
</style>
