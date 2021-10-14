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
      <StackLayout class="container">
        <FlexboxLayout alignItems="center" class="border-bottom">
          <Image
            src="~/images/icon_user.png"
            width="16"
            height="16"
            class="icon-margin"
          />
          <TextField
            v-model="usernameInput"
            hint="Usuario"
            class="form-input"
          />
        </FlexboxLayout>

        <FlexboxLayout alignItems="center" class="border-bottom">
          <Image
            src="~/images/icon_lock.png"
            width="16"
            height="16"
            class="icon-margin"
          />
          <TextField
            v-model="passwordInput"
            hint="Contraseña"
            secure="true"
            class="form-input"
          />
        </FlexboxLayout>

        <Button text="Entrar" @tap="onButtonTap" class="my-button" />

        <FlexboxLayout
          alignItems="center"
          justifyContent="center"
          class="auth-buttons"
        >
          <Label horizontalAlignment="right" text="Recuperar contraseña" />
        </FlexboxLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Match from "~/components/Match";
import Home from "~/components/Home";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import SignUp from "~/components/SignUp";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";
const indicator = new LoadingIndicator();
import Icon from "~/components/Icon";
import PasswordRecovery from "~/components/PasswordRecovery";
export default {
  data() {
    return {
      usernameInput: "",
      passwordInput: "",
      hidePassword: false
    };
  },
  mounted() {},
  components: {
    GesturePanel,
    Icon
  },
  computed: {
    message() {
      return "iVEO";
    }
  },
  methods: {
    swipe(event) {
      if (event.direction == "2") this.swipeLeft(event);
      if (event.direction == "1") this.swipeRight(event);
      if (event.direction == "4") this.swipeTop(event);
    },
    swipeRight(event) {
      this.$navigateTo(SignUp, {
        transition: {
          name: "slideRight",
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
    swipeTop(event) {
      this.$navigateTo(PasswordRecovery, {
        transition: {
          name: "slideTop",
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
    onButtonTap() {
      SpeakService.speak(Indications.SIGNINROCESS);
      indicator.show({
        message: Indications.SIGNINROCESS,
        dimBackground: true
      });
      HttpService.login(this.usernameInput, this.passwordInput)
        .then(response => {
          if (response.statusCode == 404) {
            SpeakService.speak(Indications.ERRORBADREQUEST);
            indicator.hide();
          }
          if (response.statusCode == 400) {
            SpeakService.speak(Indications.ERRORBADREQUEST);
            indicator.hide();
          }
          if (response.statusCode == 401) {
            SpeakService.speak(Indications.ERRORLOGIN);
            indicator.hide();
          }
          if (response.statusCode == 200) {
            this.$store.user = response.content.toJSON();
            indicator.hide();
            this.goHome();
          }
        })
        .catch(() => {
          SpeakService.speak(Indications.ERRORLOGIN);
        });
    }
  }
};
</script>

<style scoped lang="scss">
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

.info {
  font-size: 60;
  background-color: rgba(255, 255, 255, 0.165);
  horizontal-align: center;
  vertical-align: center;
  text-align: center;
  width: 150;
  height: 150;
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
  width: 200;
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
  margin-bottom: 60;
}
.container {
  margin-left: 34;
  margin-right: 34;
}
.iconBackground {
  background-color: red;
}
</style>
