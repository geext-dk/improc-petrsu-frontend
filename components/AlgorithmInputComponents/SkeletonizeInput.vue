<template>
  <div>
    <div class="algorithm-select-label">
      {{ $t("chooseAlgorithmLabelText") }}:
    </div>
    <switch-control
      @input="onAlgorithmInput"
      :possible-values="possibleValues"
      default-value="ZhangSuen"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import SwitchControlPossibleValue from "interfaces/SwitchControlPossibleValue";

@Component
export default class SkeletonizeInput extends Vue {
  @Prop({ type: Function, required: true }) readonly onAlgorithmInput!: (
    inputData: Record<string, string>
  ) => void;

  possibleValues: SwitchControlPossibleValue[] = [
    {
      id: "eberly-button",
      value: "Eberly",
      name: this.$t("eberlyAlgorithmName").toString(),
    },
    {
      id: "zhangsuen-button",
      value: "ZhangSuen",
      name: this.$t("zhangSuenAlgorithmName").toString(),
    },
    {
      id: "rosenfeld-button",
      value: "Rosenfeld",
      name: this.$t("rosenfeldAlgorithmName").toString(),
    },
  ];

  onInput(value: string) {
    let algorithmInput: Record<string, string> = {
      algorithm: value,
      adjacencyMode: "Eight",
    };

    this.onAlgorithmInput(algorithmInput);
  }
}
</script>

<style lang="scss" scoped>
.algorithm-select-label {
  text-align: center;
  color: var(--header-font-color);
  margin: 8px;
}
</style>
