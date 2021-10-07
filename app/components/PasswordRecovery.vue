<template>
  <Page @loaded="onLoaded">
    <ActionBar title="iVEO" />
    <FlexboxLayout flexDirection="column" @swipe="swipe" justifyContent="center" class="full">
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
            v-model="email"
            hint="Email"
            class="form-input"
          />
        </FlexboxLayout>

        <Button text="Recuperar contraseña" @tap="onButtonTap" class="my-button" />

        <FlexboxLayout
          alignItems="center"
          justifyContent="center"
          class="auth-buttons"
        >
        </FlexboxLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import SignIn from "~/components/SignIn.vue";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";
const indicator = new LoadingIndicator();
import Icon from "~/components/Icon";
export default {
  data() {
    return {
      email: ""
    };
  },
  mounted() {},
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
      if (event.direction == "8") this.swipeBottom(event);
    },
    swipeBottom(event) {
      this.$navigateTo(SignIn, {
        transition: {
          name: "slideRight",
          duration: 200,
          curve: "easeIn",
        },
      });
    },
    onButtonTap() {
      SpeakService.speak(Indications.SIGNINROCESS);
      indicator.show({
        message: Indications.SIGNINROCESS,
        dimBackground: true,
      });
      HttpService.login(this.usernameInput, this.passwordInput)
        .then((response) => {
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
    },
  },
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
