<template>
  <Page>
    <ActionBar>
      <Label text="Inicio" />
    </ActionBar>
    <GridLayout @swipe="swipe">
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
    </GridLayout>
  </Page>
</template>

<script>
import Match from "~/components/Match";
export default {
  computed: {
    message() {
      return "iVEO";
    },
  },
  methods: {
    swipe(event) {
      if (event.direction == "2")
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
  horizontal-align: center;
  vertical-align: center;
}
</style>
