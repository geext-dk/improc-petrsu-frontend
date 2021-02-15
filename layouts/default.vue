<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class DefaultLayout extends Vue {}
</script>

<style>
:root {
  --margin-size: calc(160px + (100% - 1366px) * 0.28880866426);

  --background-dark-color: #333652;
  --background-light-color: #3b3e5e;
  --background-lighter-color: #44486e;
  --font-lighter-color: #898faa;
  --main-font-color: #90adc6;
  --header-font-color: #e9eaec;
  --primary-color: #fad02c;
  --secondary-color: #6aabfb;
  --secondary-color-variant: #2e8afa;
}

@font-face {
  font-family: "Montserrat-Black";
  src: url(/fonts/Montserrat-Black.ttf);
}

@font-face {
  font-family: "SourceSansPro-Regular";
  src: url(/fonts/SourceSansPro-Regular.ttf);
}

@font-face {
  font-family: "Montserrat-Bold";
  src: url(/fonts/Montserrat-Bold.ttf);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: "SourceSansPro-Regular", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
  background-color: var(--background-dark-color);
  color: var(--main-font-color);
}

h2 {
  font-family: "Montserrat-Black";
  color: var(--header-font-color);
  font-weight: 900;
  font-size: 48px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

a {
  color: var(--primary-color);
}
</style>
