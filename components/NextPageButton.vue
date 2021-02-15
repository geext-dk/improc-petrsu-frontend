<template>
  <div
    class="arrow-button-container"
    @mouseover="onMouseOver()"
    @mouseleave="onMouseLeave()"
    @mousedown="onMouseDown()"
    @mouseup="onMouseUp()"
    @click="onClick()"
  >
    <custom-icon class="arrow-button" :name="iconName" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NextPageButton extends Vue {
  hover: boolean = false;
  active: boolean = false;

  onMouseOver() {
    this.hover = true;
  }

  onMouseLeave() {
    this.hover = false;
    this.active = false;
  }

  onMouseDown() {
    this.active = true;
  }

  onMouseUp() {
    this.active = false;
  }

  onClick() {
    this.$emit("click");
  }

  get iconName(): string {
    if (this.active) return "scroll-button-active";

    if (this.hover) return "scroll-button-hover";

    return "scroll-button-normal";
  }
}
</script>

<style lang="scss">
.arrow-button-container {
  cursor: pointer;
}

.arrow-button {
  width: 56px;
  height: 56px;
}
</style>
