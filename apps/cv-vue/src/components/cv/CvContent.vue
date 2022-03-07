<template>
  <div class="cv-content">
    <TransitionGroup name="list">
      <CvSection
        v-for="section in activeSections"
        :key="section.id"
        :id="section.id"
        class="section"
        :class="{ pagebreak: section.pagebreak }"
      ></CvSection>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useContentStore } from '../../store';

import CvSection from './CvSection.vue';

export default defineComponent({
  name: 'CvContent',
  components: { CvSection },
  props: { pixelRatio: Number },
  setup() {
    const store = useContentStore();

    const { activeSections } = storeToRefs(store);

    return { activeSections };
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
.section ~ .section {
  margin-top: 5rem;
}
</style>
