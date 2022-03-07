<template>
  <div class="cv-content">
    <TransitionGroup name="list">
      <div
        v-for="section in content.sections"
        :key="section.id"
        class="section"
        :class="{ pagebreak: section.pagebreak }"
      >
        <template v-if="section.active">
          <CvSection :id="section.id"></CvSection>
        </template>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import {
  createApp,
  defineComponent,
  onMounted,
  onUpdated,
  watchEffect,
  watchPostEffect,
} from 'vue';
import { useElementSize, useElementByPoint, useMouse } from '@vueuse/core';
import { cloneDeep } from 'lodash-es';

import { useContentStore, usePrintStore } from '../../store';
import { useElementFromPoint } from '../../hooks/element-from-point.hook';

import CvSection from './CvSection.vue';

const createPage = () => {
  const div = document.createElement('div');

  div.style.minHeight = '297mm';
  div.style.maxHeight = '297mm';

  div.style.minWidth = '21cm';
  div.style.maxWidth = '21cm';

  document.body.appendChild(div);

  return div;
};

export default defineComponent({
  name: 'CvContent',
  components: { CvSection },
  props: { pixelRatio: Number },
  setup() {
    const store = useContentStore();
    const print = usePrintStore();

    const { content } = storeToRefs(store);
    const { pixelRatio } = storeToRefs(print);

    // watchPostEffect(() => {
    //   if (pixelRatio.value === 1) return;

    //   const point = {
    //     x: 10 * pixelRatio.value,
    //     y: 29.7 * pixelRatio.value,
    //   };

    //   const el = useElementFromPoint(point);
    //   console.log(el.element.value, pixelRatio.value, point);
    // });

    // const pages = [createPage()];
    // const { sections } = store.$state.cvContent;
    // const bucket = cloneDeep(sections);

    // onMounted(() => {
    //   // while (bucket.length) {
    //   const item = bucket.shift();

    //   const rendered = createApp(CvSection, { ...item }).mount(pages[0]);
    //   const { height, width } = useElementSize(rendered);

    //   setTimeout(
    //     () =>
    //       console.log(
    //         height.value,
    //         width.value,
    //         pages[0],
    //         rendered.$el,
    //         bucket.length
    //       ),
    //     0
    //   );

    //   //   break;
    //   // }
    // });

    return { content };
  },
});
</script>

<style scoped lang="scss">
@media print {
  .cv-content {
    padding-top: 1rem;
  }
}

@mixin page-grid {
  display: grid;
}

.cv-content {
  padding: 0 1rem;

  // @include page-grid;
}
</style>

<style lang="scss">
.cv-content {
  h1 {
    font-size: 2.25rem;

    &:first-of-type {
      margin-top: calc(24px * 0.83);
    }
  }
}

.section ~ .section {
  margin-top: 5rem;
}
</style>
