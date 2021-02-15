<template>
  <button
    type="button"
    class="upload-button"
    :disabled="isDisabled"
    @click="onClick()"
  >
    <div class="upload-button-content"><slot /></div>
    <input
      type="file"
      class="upload-button-input"
      ref="uploadButtonInput"
      @input="onInput()"
    />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class ClickButton extends Vue {
  $refs!: {
    uploadButtonInput: HTMLInputElement;
  };

  @Prop({ type: Boolean, default: false }) readonly isDisabled!: boolean;

  onClick() {
    this.$refs.uploadButtonInput.click();
  }

  onInput() {
    const files = this.$refs.uploadButtonInput.files;
    if (files != null && files.length > 0) {
      this.$emit("input", files[0]);
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-button {
  all: unset;
  display: inline-grid;
  font-family: "Montserrat-Bold";
  background: #333652;
  width: 100%;
  border-radius: 20px;
  cursor: pointer;

  &::before {
    content: "";
    grid-area: 1 / 1 / 1 / 1;

    border: 3px solid var(--primary-color);
    border-radius: 20px;
    z-index: 2;
  }

  &-content {
    grid-area: 1 / 1 / 1 / 1;

    padding: 16px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-light-color);
    color: var(--primary-color);

    user-select: none;
  }

  &:hover {
    &::before {
      border-color: var(--secondary-color);
    }

    & .click-button-content {
      color: var(--secondary-color);
    }
  }

  &:active {
    &::before {
      border-color: var(--secondary-color-variant);
    }
    & .click-button-content {
      color: var(--secondary-color-variant);
    }
  }

  &:disabled {
    &::before {
      border: none;
    }
    & .click-button-content {
      color: var(--font-lighter-color);
      background: var(--background-lighter-color);
    }
  }

  &-input {
    display: none;
  }
}
</style>
