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
  @apply flex relative bg-white;
}

#content {
  @apply w-full;
}

#measure {
  @apply absolute h-0 w-[1cm];
}

.page-marker {
  @apply absolute top-0 bottom-0 left-0 right-0 z-20 pointer-events-none print:hidden;
  background: repeat-y url('../assets/page.svg');
}
</style>
