<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />
    <GesturePanel
      btnLabel="Escaneando objeto..."
      @swipeTop="swipeTop"
      @swipeLeft="swipeLeft"
    >
      <FlexboxLayout
        flexDirection="column"
        justifyContent="center"
        class="full"
      >
        <Image src="~/images/nsvue_logo.png" class="logo-container" />
        <Label class="info">
          <FormattedString>
            <Span text="i" class="i" />
            <Span text="V" class="v" />
            <Span text="E" class="e" />
            <Span text="O" class="o" />
          </FormattedString>
        </Label>
      </FlexboxLayout>
    </GesturePanel>
  </Page>
</template>

<script>
import Match from "~/components/Match";
import AddNewCamera from "~/components/AddNewCamera";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import GesturePanel from "~/components/GesturePanel.vue";
export default {
  components: {
    GesturePanel
  },
  computed: {
    message() {
      return "iVEO";
    }
  },
  methods: {
    swipeTop(event) {
      this.$navigateTo(AddNewCamera, {
        transition: {
          name: "slideTop",
          duration: 200,
          curve: "easeIn"
        }
      });
    },
    swipeLeft(event) {
      this.$navigateTo(Match, {
        transition: {
          name: "slideLeft",
          duration: 200,
          curve: "easeIn"
        }
      });
    },
    onLoaded() {
      SpeakService.speak(Indications.BIENVENIDO).then(() => {
        SpeakService.speak(Indications.HOMEGESTURES);
      });
    }
  }
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
}
</style>
