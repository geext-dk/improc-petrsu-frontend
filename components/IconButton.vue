<template>
  <div
    class="icon-button-container"
    @mouseover="onMouseOver()"
    @mouseleave="onMouseLeave()"
    @mousedown="onMouseDown()"
    @mouseup="onMouseUp()"
    @click="onClick()"
  >
    <custom-icon :style="buttonStyle" :name="iconNameWithStatus" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class IconButton extends Vue {
  @Prop({ type: String, default: "56px" }) readonly width!: string;
  @Prop({ type: String, default: "56px" }) readonly height!: string;
  @Prop({ type: String, default: "56px" }) readonly iconName!: string;

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

  get iconNameWithStatus(): string {
    if (this.active) return `${this.iconName}-active`;

    if (this.hover) return `${this.iconName}-hover`;

    return `${this.iconName}-normal`;
  }

  get buttonStyle(): { width: string; height: string } {
    return {
      height: this.height,
      width: this.width,
    };
  }
}
</script>

<style lang="scss">
.icon-button-container {
  cursor: pointer;
}
</style>
