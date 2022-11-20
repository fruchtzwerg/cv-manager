<template>
  <div class="cv-content" data-theme="winter">
    <TransitionGroup name="list">
      <CvSection v-for="section in activeSections" :key="section.id" :id="section.id"></CvSection>
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
  padding: 2rem 1rem;
}
</style>
