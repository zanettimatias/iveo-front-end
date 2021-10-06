<template>
  <Page>
    <ActionBar title="iVEO"> </ActionBar>
    <GesturePanel
      btnLabel="Escaneando objeto..."
      @swipeTop="swipeTop"
      @swipeLeft="swipeLeft"
    >
      <GridLayout>
        <Label class="info">
          <FormattedString>
            <Span class="fas" text.decode="&#xf5f0; " />
            <Span :text="message" />
          </FormattedString>
        </Label>
      </GridLayout>
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
  mounted() {
    SpeakService.speak(Indications.BIENVENIDO).then(() => {
      SpeakService.speak(Indications.HOMEGESTURES);
    });
  },
  components: {
    GesturePanel,
  },
  computed: {
    message() {
      return "iVEO";
    },
  },
  methods: {
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
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 60;
  background-color: aqua;
  horizontal-align: center;
  vertical-align: center;
}
ActionBar {
  background-color: #000000;
  color: #ffffff;
}
</style>
