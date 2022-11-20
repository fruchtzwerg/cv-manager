<template>
  <button class="btn btn-primary gap-2" :disabled="!hasContent" @click="print()">
    <icon-carbon-printer class="text-lg" />Print
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useContentStore } from '../../store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ContentPrint',

  setup() {
    const store = useContentStore();
    const { hasContent } = storeToRefs(store);

    const print = () => window.print();

    return { hasContent, print };
  },
});
</script>

<style scoped lang="scss"></style>
