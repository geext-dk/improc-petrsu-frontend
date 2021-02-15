<template>
  <footer class="footer">
    <div class="authors">
      {{ $t("developerCreditText") }}: {{ $t("denisName") }}
      <br />
      <a href="mailto:geext29@gmail.com">geext29@gmail.com</a>
      <br />
      {{ $t("designCreditText") }}: {{ $t("lyudmilaName") }}
      <br />
      <a href="mailto:ritsumei@yandex.ru">ritsumei@yandex.ru</a>
    </div>
    <div class="back-to-up-button">
      <a @click="onBackToUpClick()"><icon-button icon-name="button-up" /></a>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class SiteFooter extends Vue {
  @Prop({ type: String, required: true }) readonly backToUpElementId!: string;

  onBackToUpClick() {
    this.$scrollTo(this.backToUpElementId);
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
  padding: 16px;
}

.authors {
  grid-row-start: 1;
  grid-column: 2 / span 4;
}

.back-to-up-button {
  grid-row-start: 1;
  grid-column-start: 12;
}
</style>
