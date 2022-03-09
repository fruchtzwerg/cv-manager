<template>
  <div class="container" ref="container">
    <CvAside id="aside"></CvAside>
    <CvContent id="content"></CvContent>

    <div class="page-marker"></div>
    <div id="measure" ref="measure"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import CvAside from './cv/CvAside.vue';
import CvContent from './cv/CvContent.vue';
import { usePrintStore } from '../store';

export default defineComponent({
  name: 'Preview',
  components: {
    CvAside,
    CvContent,
  },
  setup() {
    const printStore = usePrintStore();

    const container = ref<HTMLElement>();
    const measure = ref<HTMLElement>();

    onMounted(() => {
      const pixelRatio = measure.value?.getBoundingClientRect().width;
      printStore.$patch({ pixelRatio });

      const observer = new ResizeObserver(entries => {
        const { height } = entries[0].contentRect;
        printStore.$patch({ height });
      });

      observer.observe(container.value as HTMLElement);
    });

    return { container, measure };
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  position: relative;
  background-color: white;
}

.print {
  position: fixed;
  bottom: 4rem;
  left: calc((100vw - var(--sidebar-width)) / 2 + 10.5cm - 3rem);
}

#content {
  width: 100%;
}

#measure {
  position: absolute;
  width: 1cm;
  height: 0;
}

.page-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: repeat-y url('../assets/page.svg');
  z-index: 99;
  pointer-events: none;

  @media print {
    display: none;
  }
}
</style>
