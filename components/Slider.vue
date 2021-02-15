<template>
  <div class="slider">
    <div class="slider-with-text">
      <div class="top-left-slider-text">0</div>
      <div class="top-right-slider-text">255</div>
      <input
        type="range"
        id="threshold-slider"
        name="threshold-slider"
        min="0"
        max="255"
        :value="value"
        @input="onInput"
        :style="{ background: sliderBackground }"
      />
      <div class="bottom-left-slider-text">{{ $t("sliderWhiteText") }}</div>
      <div class="bottom-right-slider-text">{{ $t("sliderBlackText") }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Slider extends Vue {
  @Prop({ type: Number, required: true }) readonly value!: number;
  @Prop({ type: Number, required: true }) readonly min!: number;
  @Prop({ type: Number, required: true }) readonly max!: number;
  get sliderBackground(): string {
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    return (
      "linear-gradient(to right, #fad02c 0%, #fad02c " +
      value +
      "%, #4E537E " +
      value +
      "%, #4E537E 100%)"
    );
  }

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
.slider-with-text {
  position: relative;
}

.top-left-slider-text {
  position: absolute;
  left: 0px;
  top: 0px;
}

.top-right-slider-text {
  position: absolute;
  right: 0px;
  top: 0px;
}

.bottom-left-slider-text {
  position: absolute;
  left: 0px;
  bottom: 0px;
}

.bottom-right-slider-text {
  position: absolute;
  right: 0px;
  bottom: 0px;
}

#threshold-slider {
  background: linear-gradient(
    to right,
    var(--primary-color) 0%,
    var(--primary-color) 50%,
    white 50%,
    white 100%
  );
  border-radius: 8px;
  height: 7px;
  outline: none;
  transition: background 450ms ease-in;
  -webkit-appearance: none;
  margin: 30px 0;
}
input[type="range"] {
  width: 100%;
  margin: 7px 0;
  background-color: transparent;
  -webkit-appearance: none;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  border: 0px solid black;
  border-radius: 25px;
  width: 100%;
  height: 5px;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  margin-top: -7.2px;
  width: 19px;
  height: 19px;
  background: var(--primary-color);
  border: 0;
  border-radius: 19px;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type="range"]::-moz-range-track {
  border: 0px solid black;
  border-radius: 25px;
  width: 100%;
  height: 5px;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  width: 19px;
  height: 19px;
  background: var(--primary-color);
  border: 0;
  border-radius: 19px;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  border-color: transparent;
  border-width: 7px 0;
  color: transparent;
  width: 100%;
  height: 5px;
  cursor: pointer;
}
input[type="range"]::-ms-thumb {
  width: 19px;
  height: 19px;
  background: var(--primary-color);
  border: 0;
  border-radius: 19px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}
input[type="range"]:hover::-webkit-slider-thumb {
  background: var(--secondary-color);
}
input[type="range"]::-webkit-slider-thumb:active {
  background: var(--secondary-color-variant);
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align: auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type="range"] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}
</style>
