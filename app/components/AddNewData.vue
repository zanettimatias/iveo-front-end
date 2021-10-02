<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />
    <GridLayout height="100%" width="100%" ref="all">
      <StackLayout ref="form" class="formulario">
        <Label
          :text="indicactions.COMPLETARFORMULARIO"
          textWrap="true"
          textAlignment="left"
          class="titulo"
          marginLeft="15"
          marginTop="15"
        />
        <TextField v-model="marca" />
        <Label :text="marca" style="text-align: center" />
        <TextField :text="modelo" hint="Modelo" />
        <TextField :text="material" hint="Material" />
        <TextField :text="envase" hint="Envase" />
        <TextField :text="contenido" hint="Contenido" />
        <TextField :text="color" hint="Color, si aplica" />
        <TextField
          :text="descripcion"
          hint="Complete una descripción que identifique al objeto"
        />
        <WrapLayout>
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
        <Button text="Confirmar Cambios" @tap="doSave" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";

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
      console.log(this.marca);
      HttpService.newProductoTestMulti(this.dataFactory(), this.imagenes)
        .then((e) => {
          console.log("OK");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dataFactory() {
      console.log(this.marca);
      let data = [];
      if (!this.marca) data.push({ name: "marca", value: this.marca });
      if (!this.material) data.push({ name: "material", value: this.material });
      if (!this.envase) data.push({ name: "envase", value: this.envase });
      if (!this.descripcion)
        data.push({ name: "descripcion", value: this.descripcion });
      if (!this.color) data.push({ name: "color", value: this.color });
      if (!this.contenido)
        data.push({ name: "contenido", value: this.contenido });
      if (!this.modelo) data.push({ name: "modelo", value: this.modelo });

      return data;
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
</style>