<template>
  <div class="algorithm-preview">
    <div class="algorithm-section">
      <div
        class="preview-image"
        :style="{ backgroundImage: previewImageSrc }"
        @mouseleave="onMouseLeavePreviewImage()"
        @mouseover="onMouseOverPreviewImage()"
      ></div>
      <div class="preview-image-description">
        {{ $t("previewImageDescriptionText") }}
      </div>
      <slot name="algorithmInput" :on-algorithm-input="onAlgorithmInput" />
      <div class="upload-button-container">
        <upload-button
          class="upload-button"
          @input="onUpload($event)"
          v-if="!uploading"
          >{{ $t("uploadImageButtonText") }}</upload-button
        >
        <progress-bar
          class="upload-progress"
          :progress="uploadProgress"
          v-if="uploading"
          >{{ $t("processingText") }}</progress-bar
        >
      </div>
      <click-button
        :isDisabled="imageResultBase64 == null"
        @click="onDownloadClick()"
        >{{ $t("downloadImageButtonText") }}</click-button
      >
    </div>
    <div class="algorithm-description">
      <div class="algorithm-description-text">
        <h2>{{ headerText }}</h2>
        <p>{{ descriptionText }}</p>
      </div>
      <div class="algorithm-example">
        <div
          class="algorithm-example-before"
          :style="{ backgroundImage: `url(${exampleImageOriginal})` }"
        ></div>
        <div class="algorithm-example-arrow">
          <custom-icon name="arrow-straight" width="72px" height="34px" />
        </div>
        <div
          class="algorithm-example-after"
          :style="{ backgroundImage: `url(${exampleImageProcessed})` }"
        ></div>
      </div>
      <div
        class="next-page-button-container"
        :style="{ visibility: nextPageButtonVisibility }"
      >
        <a @click="onNextPageClick()"
          ><icon-button icon-name="scroll-button"
        /></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import config from "~/app-config.ts";

@Component
export default class AlgorithmPreview extends Vue {
  @Prop({ type: String, default: null }) readonly nextPageElementId!:
    | string
    | null;
  @Prop({ type: String, required: true }) readonly previewImageUrl!: string;
  @Prop({ type: String, default: null }) readonly apiPath!: string | null;
  @Prop({ type: String, required: true }) readonly headerText!: string;
  @Prop({ type: String, required: true }) readonly descriptionText!: string;
  @Prop({ type: String, required: true })
  readonly exampleImageOriginal!: string;
  @Prop({ type: String, required: true })
  readonly exampleImageProcessed!: string;

  uploadProgress = 0;
  algorithmInputData: Record<string, string> | null = null;
  uploading = false;
  imageResultBase64: string | null = null;
  originalImageBase64Url: string | null = null;

  previewImageHover = false;

  onNextPageClick() {
    if (this.nextPageElementId != null) {
      this.$scrollTo(this.nextPageElementId);
    }
  }

  onDownloadClick() {
    if (this.imageResultBase64 != null) {
      let a = document.createElement("a");
      a.href = "data:image/png;base64," + this.imageResultBase64;
      a.download = "result.png";
      a.click();
    }
  }

  get nextPageButtonVisibility() {
    return this.nextPageElementId != null ? "visible" : "hidden";
  }

  get previewImageSrc() {
    if (this.previewImageHover) {
      return this.originalImageBase64Url == null
        ? `url(${this.previewImageUrl})`
        : `url(${this.originalImageBase64Url})`;
    } else {
      if (this.imageResultBase64 != null)
        return `url(data:image/png;base64,${this.imageResultBase64})`;
      else if (this.uploading && this.originalImageBase64Url != null)
        return this.originalImageBase64Url;
      else return `url(${this.previewImageUrl})`;
    }
  }

  get previewImageHoverSrc() {
    return this.originalImageBase64Url == null
      ? `url(${this.previewImageUrl})`
      : this.originalImageBase64Url;
  }

  onAlgorithmInput(inputData: Record<string, string>) {
    this.algorithmInputData = inputData;
  }

  onUpload(file: File) {
    this.uploading = true;
    this.imageResultBase64 = null;

    let params = "";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.originalImageBase64Url = <string>reader.result;

      if (this.algorithmInputData != null) {
        params = new URLSearchParams(this.algorithmInputData).toString();
      }

      const url = `${config.apiHost}${this.apiPath}?${params}`;
      const self = this;

      const formData = new FormData();
      formData.append("file", file);

      self.$axios.post(url, formData).then((res) => {
        self.uploadProgress = 0;
        this.monitorFileProcessing(res.data.imageId);
      });
    });

    reader.readAsDataURL(file);
  }

  monitorFileProcessing(fileId: string) {
    const self = this;
    this.$axios
      .get(config.apiHost + "/api/images/getProgress/" + fileId)
      .then((res) => {
        const { progress, isReady } = res.data;
        self.uploadProgress = progress * 100;

        if (isReady) {
          this.$axios
            .get(config.apiHost + "/api/images/take/" + fileId, {
              responseType: "arraybuffer",
            })
            .then((res) => {
              this.imageResultBase64 = this.arrayBufferToBase64(res.data);
              this.uploading = false;
              this.uploadProgress = 0;
            });
        } else {
          setTimeout(() => this.monitorFileProcessing(fileId), 1500);
        }
      });
  }

  arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
    var binary = "";
    var bytes = new Uint8Array(arrayBuffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  onMouseOverPreviewImage() {
    this.previewImageHover = true;
  }

  onMouseLeavePreviewImage() {
    this.previewImageHover = false;
  }
}
</script>

<style lang="scss" scoped>
.algorithm-preview {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 16px;
}

.algorithm-section {
  grid-column: 2 / span 4;
  grid-row-start: 1;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: stretch;

  gap: 32px;
}

.preview-image {
  height: 100%;
  background-size: cover;
  background-position: center;
  border: 0px solid black;
  border-radius: 20px;
  object-fit: cover;
}

.algorithm-description {
  display: flex;
  gap: 48px;
  flex-direction: column;
  grid-column: 8 / span 5;
  grid-row-start: 1;
}

.algorithm-example {
  flex-grow: 1;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  justify-items: center;
  align-items: center;

  %example-image {
    grid-row: 1;

    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border: 0px solid white;
    border-radius: 20px;
  }

  &-before {
    @extend %example-image;

    grid-column: 1 / span 2;
  }

  &-after {
    @extend %example-image;

    grid-column: 4 / span 2;
  }
}

.next-page-button-container {
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>
