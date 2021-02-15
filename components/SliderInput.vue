<template>
  <input
    type="number"
    class="slider-input"
    :value="value"
    :min="min"
    :max="max"
    @input="onInput"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class SliderInput extends Vue {
  @Prop({ type: Number, required: true }) readonly value!: number;
  @Prop({ type: Number, required: true }) readonly min!: number;
  @Prop({ type: Number, required: true }) readonly max!: number;

  onInput(event: Event & { target: HTMLInputElement }) {
    let value = parseInt(event.target.value);
    value = value || 0;
    value = value <= this.min ? this.min : value;
    value = value > this.max ? this.max : value;
    this.$emit("input", value);
    this.$forceUpdate();
  }
}
</script>

<style scoped>
.slider-input::-webkit-outer-spin-button,
.slider-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.slider-input {
  all: unset;
  -moz-appearance: textfield;
  width: 50px;
  height: 31px;

  border: 1px solid var(--font-lighter-color);
  border-radius: 5px;
  text-align: center;
  color: var(--font-lighter-color);
}

.slider-input:hover {
  border-color: var(--secondary-color);
}

.slider-input:active {
  border-color: var(--primary-color);
  color: var(--header-font-color);
}

.slider-input:focus {
  border-color: var(--primary-color);
  color: var(--header-font-color);
}
</style>
