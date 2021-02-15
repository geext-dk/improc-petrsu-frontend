<template>
  <form class="switch-control">
    <div v-for="possibleValue in possibleValues" :key="possibleValue.id">
      <input
        :id="possibleValue.id"
        type="radio"
        name="switch-control-value"
        :value="possibleValue.value"
        v-model="currentValue"
        @change="onChange()"
      />
      <label :for="possibleValue.id">
        {{ possibleValue.name }}
      </label>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import SwitchControlPossibleValue from "interfaces/SwitchControlPossibleValue";

@Component
export default class SwitchControl extends Vue {
  @Prop({ type: Array, required: true })
  readonly possibleValues!: SwitchControlPossibleValue[];
  @Prop({ type: String, required: true }) readonly defaultValue!: string;

  currentValue = this.defaultValue;

  onChange() {
    this.$emit("input", this.currentValue);
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.switch-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  padding: 1px;

  div {
    label {
      padding: 8px;
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      color: var(--header-font-color);
      cursor: pointer;
    }

    &:first-child label {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child label {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    input {
      display: none;
    }

    input:checked + label {
      color: var(--background-dark-color);
      background-color: var(--primary-color);
    }
  }
}
</style>
