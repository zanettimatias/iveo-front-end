<template>
  <Page>
    <ActionBar title="iVEO" />
    <GesturePanel btnLabel="aadfafd" @swipeBottom="swipeBottom">
      <FlexboxLayout
        flexDirection="column"
        justifyContent="center"
        class="full"
      >
        <Image src="~/images/nsvue_logo.png" class="logo-container" />

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
              hint="usuario"
              class="form-input"
            />
          </FlexboxLayout>
          <FlexboxLayout alignItems="center" class="border-bottom">
            <Image
              src="~/images/icon_user.png"
              width="16"
              height="16"
              class="icon-margin"
            />
            <TextField v-model="emailInput" hint="Email" class="form-input" />
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

          <Button text="Crear cuenta" @tap="onButtonTap" class="my-button" />

          <FlexboxLayout
            alignItems="center"
            justifyContent="space-between"
            class="auth-buttons"
          >
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </GesturePanel>
  </Page>
</template>

<script>
import Match from "~/components/Match";
import AddNewCamera from "~/components/AddNewCamera";
import Home from "~/components/Home";
import { SpeakService } from "~/services/SpeakService";
import { Indications } from "~/services/locale/indications-es";
import GesturePanel from "~/components/GesturePanel.vue";
import { HttpService } from "~/services/HttpService";
import SigIn from "~/components/SignIn.vue";
export default {
  data() {
    return {
      usernameInput: "",
      passwordInput: "",
      emailInput: "",
      hidePassword: false,
    };
  },
  mounted() {},
  components: {
    GesturePanel,
  },
  computed: {
    message() {
      return "iVEO";
    },
  },
  methods: {
    swipeBottom(event) {
      this.goSignIn();
    },
    goSignIn() {
      this.$navigateTo(SigIn, {
        transition: {
          name: "slideBottom",
          duration: 200,
          curve: "easeIn",
        },
      });
    },
    onButtonTap() {
      HttpService.signUp(
        this.usernameInput,
        this.passwordInput,
        this.emailInput
      )
        .then((e) => {
          if (response.status == 400) {
            SpeakService.speak(Indications.ERRORBADREQUEST);
          }
          if (response.status == 401) {
            SpeakService.speak(Indications.ERRORBADREQUEST);
          }
          if (response.status == 200) {
            this.goSignIn();
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
