<template>
  <div class="progress-bar">
    <div class="progress-bar-fill" :style="clipPathStyle"><slot /></div>
    <div class="progress-bar-back"><slot /></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class ProgressBar extends Vue {
  @Prop({ type: Number, default: 0 }) readonly progress!: number;

  get clipPathStyle(): object {
    let progress = Math.max(this.progress, 0);
    progress = Math.min(progress, 100);

    let path = `inset(0 ${100 - this.progress}% 0 0)`;
    return {
      "clip-path": path,
      "-webkit-clip-path": path,
    };
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  display: inline-grid;
  font-family: "Montserrat-Bold";
  background: var(--bakground-dark-color);
  width: 100%;
  border-radius: 20px;

  &::before {
    content: "";
    grid-area: 1 / 1 / 1 / 1;

    border: 3px solid var(--primary-color);
    border-radius: 20px;
    z-index: 2;
  }

  %progress-bar-inner {
    grid-area: 1 / 1 / 1 / 1;

    padding: 16px;
    border-radius: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    user-select: none;
  }

  &-fill {
    @extend %progress-bar-inner;

    background: var(--primary-color);
    color: var(--background-dark-color);

    transition: clip-path 1.5s cubic-bezier(0.23, 0.96, 0.57, 0.89);
  }

  &-back {
    @extend %progress-bar-inner;

    background: var(--background-light-color);
    color: var(--primary-color);
  }
}
</style>
