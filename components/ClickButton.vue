<template>
  <button
    type="button"
    class="click-button"
    :disabled="isDisabled"
    @click="onClick()"
  >
    <div class="click-button-content"><slot /></div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class ClickButton extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isDisabled!: boolean;

  onClick() {
    this.$emit("click");
  }
}
</script>

<style lang="scss" scoped>
.click-button {
  all: unset;
  display: inline-grid;
  font-family: "Montserrat-Bold";
  width: 100%;
  border-radius: 20px;
  cursor: pointer;

  &::before {
    content: "";
    grid-area: 1 / 1 / 1 / 1;

    border: 3px solid var(--primary-color);
    border-radius: 20px;
    z-index: 2;
    background-color: var(--primary-color);
  }

  &-content {
    grid-area: 1 / 1 / 1 / 1;

    padding: 16px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--background-dark-color);
    z-index: 3;

    user-select: none;
  }

  &:hover {
    &::before {
      border-color: var(--secondary-color);
      background-color: var(--secondary-color);
    }
  }

  &:active {
    &::before {
      border-color: var(--secondary-color-variant);
      background-color: var(--secondary-color-variant);
    }
  }

  &:disabled {
    &::before {
      border: none;
      background-color: var(--background-lighter-color);
    }

    .click-button-content {
      color: var(--font-lighter-color);
      background: var(--background-lighter-color);
    }
  }
}
</style>
