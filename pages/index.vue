<template>
  <div class="index-container">
    <div class="dummy-color-section"></div>
    <div class="algorithms-container">
      <algorithm-preview
        id="first-page"
        class="first-algorithm"
        next-page-element-id="second-page"
        :preview-image-url="require('~/assets/images/ginger-cat.jpg')"
        :example-image-original="require('~/assets/images/ginger-cat.jpg')"
        :example-image-processed="
          require('~/assets/images/ginger-cat-binary.png')
        "
        :header-text="$t('convertToBinaryHeader')"
        :description-text="$t('convertToBinaryDescription')"
        api-path="/api/images/convertToBinary"
      >
        <template v-slot:algorithmInput="{ onAlgorithmInput }">
          <threshold-input :on-algorithm-input="onAlgorithmInput" />
        </template>
      </algorithm-preview>
      <algorithm-preview
        id="second-page"
        class="second-algorithm"
        :preview-image-url="require('~/assets/images/overcooked-bread-cat.jpg')"
        :example-image-original="
          require('~/assets/images/overcooked-bread-cat-binary.png')
        "
        :example-image-processed="
          require('~/assets/images/overcooked-bread-cat-skeleton.png')
        "
        :header-text="$t('skeletonizeHeader')"
        :description-text="$t('skeletonizeDescription')"
        api-path="/api/images/skeletonize"
      >
        <template v-slot:algorithmInput="{ onAlgorithmInput }">
          <skeletonize-input :on-algorithm-input="onAlgorithmInput" />
        </template>
      </algorithm-preview>
      <!-- <algorithm-preview
        id="third-page"
        class="third-algorithm"
        :cat-image-url="getImagePath('black-white-cat.jpg')"
      /> -->
    </div>
    <site-footer class="index-footer" back-to-up-element-id="first-page" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AlgorithmPreview from "../components/AlgorithmPreview.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import Component from "vue-class-component";

@Component({
  components: {
    AlgorithmPreview,
    SiteFooter,
  },
})
export default class Index extends Vue {}
</script>

<style>
.index-container {
  margin-left: var(--margin-size);
  margin-right: var(--margin-size);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, auto);
  column-gap: 16px;
  row-gap: 40px;
}

.algorithms-container {
  grid-row-start: 1;
  grid-column: 1 / span 12;

  display: grid;
  row-gap: 160px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(90vh, auto);
}

.dummy-color-section {
  grid-column: 1 / span 6;
  grid-row: 1 / 5;
  background-color: var(--background-light-color);
}

.first-algorithm,
.second-algorithm,
.third-algorithm {
  padding-top: 40px;
  grid-column: 1 / span 12;
}

.index-footer {
  grid-column: 1 / span 12;
}

.first-algorithm {
  grid-row-start: 1;
}

.second-algorithm {
  grid-row-start: 2;
}

.third-algorithm {
  grid-row-start: 3;
}

.index-footer {
  grid-row-start: 4;
}
</style>
