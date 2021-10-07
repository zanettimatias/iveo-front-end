<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />

    <FlexboxLayout
      flexDirection="column"
      @swipe="swipe"
      justifyContent="center"
      class="full"
    >
      <StackLayout justifyContent="center" class="logo-container">
        <Icon />
      </StackLayout>
      <Label text="" />
    </FlexboxLayout>
  </Page>
</template>

<script>
import Match from "~/components/Match";
import AddNewCamera from "~/components/AddNewCamera";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import GesturePanel from "~/components/GesturePanel.vue";
import Icon from "~/components/Icon";
export default {
  components: {
    GesturePanel,
    Icon,
  },
  computed: {
    message() {
      return "iVEO";
    },
  },
  methods: {
    swipe(event) {
      if (event.direction == "2") this.swipeLeft(event);
      if (event.direction == "4") this.swipeTop(event);
    },
    swipeTop(event) {
      this.$navigateTo(AddNewCamera, {
        transition: {
          name: "slideTop",
          duration: 200,
          curve: "easeIn",
        },
      });
    },
    swipeLeft(event) {
      this.$navigateTo(Match, {
        transition: {
          name: "slideLeft",
          duration: 200,
          curve: "easeIn",
        },
      });
    },
    onLoaded() {
      SpeakService.speak(Indications.BIENVENIDO).then(() => {
        SpeakService.speak(Indications.HOMEGESTURES);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

.i {
  color: rgb(59, 139, 214);
}
.v {
  color: whitesmoke;
}
.e {
  color: #ffffff;
}
.o {
  font-weight: 800;
  color: whitesmoke;
}
// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 60;
  background-color: rgba(255, 255, 255, 0.165);
  horizontal-align: center;
  vertical-align: center;
  text-align: center;
}
ActionBar {
  background-color: #000000;
  color: #ffffff;
}
.border-bottom {
  border-bottom-width: 1;
  border-bottom-color: white;
  margin-bottom: 40;
  padding-bottom: 8;
}
.form-input {
  color: white;
  placeholder-color: white;
  border: 0;
  font-size: 15;
  border-bottom-width: 0;
}
.icon-margin {
  margin-right: 10;
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
  margin-top: 10;
}
.auth-buttons {
  color: white;
  font-size: 14;
}
.full {
  height: 100%;
  width: 100%;
  background-color: black;
}
.logo-container {
  width: 150;
  margin-bottom: 60;
}
.container {
  margin-left: 34;
  margin-right: 34;
  background-color: black;
}
.label {
  color: white;
  font-size: 20;
}
.full {
  height: 100%;
  width: 100%;
  background-color: black;
}
</style>
