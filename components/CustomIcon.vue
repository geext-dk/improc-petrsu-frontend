<template>
  <svg>
    <use
      class="custom-icon"
      :xlink:href="iconLink"
      @click="this.$emit('click')"
    />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class CustomIcon extends Vue {
  @Prop({ type: String, required: true }) readonly name!: string;

  get iconLink() {
    let spriteUrl = require("~/assets/sprite.svg");
    return spriteUrl + `#icon-${this.name}`;
  }
}
</script>

<style lang="scss" scoped>
.custom-icon {
  pointer-events: none;
}
</style>
