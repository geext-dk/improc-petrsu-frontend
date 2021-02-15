import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $scrollTo(elementId: string): void
  }
}

Vue.prototype.$scrollTo = function (elementId: string) {
  const anchor = document.querySelector(`#${elementId}`);

  // Check if the anchor has been found
  if (anchor) {
    window.scrollTo({
      // Scroll so that the anchor is at the top of the view
      top: anchor.getBoundingClientRect().top + window.pageYOffset,
    });
  }
}
