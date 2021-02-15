<template>
  <div class="threshold-input">
    <div class="threshold-input-label">{{ $t("sliderHeaderText") }}:</div>
    <div class="slider-container">
      <slider
        class="threshold-slider-input"
        :min="thresholdMin"
        :max="thresholdMax"
        v-model="threshold"
      />
      <slider-input
        class="threshold-text-input"
        :min="thresholdMin"
        :max="thresholdMax"
        v-model="threshold"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop } from "vue-property-decorator";

@Component
export default class ThresholdInput extends Vue {
  @Prop({ type: Function, required: true }) readonly onAlgorithmInput!: (
    inputData: Record<string, string>
  ) => void;

  thresholdMin: number = 0;
  thresholdMax: number = 255;
  threshold: number = 125;

  @Watch("threshold")
  onThresholdChange(val: number, _: number) {
    let algorithmInput: Record<string, string> = {
      threshold: val.toString(),
    };

    this.onAlgorithmInput(algorithmInput);
  }
}
</script>

<style lang="scss" scoped>
.threshold-slider-input {
  width: 100%;
}

.threshold-input-label {
  text-align: center;
  color: var(--header-font-color);
}

.threshold-text-input {
  display: block;
}

.slider-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
}
</style>
