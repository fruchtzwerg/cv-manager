<template>
  <Button
    icon="pi pi-print"
    class="p-button-rounded fab"
    :disabled="!hasContent"
    @click="print()"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
import { useContentStore } from '../../store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ContentPrint',
  components: { Button },
  setup() {
    const store = useContentStore();
    const { hasContent } = storeToRefs(store);

    const print = () => window.print();

    return { hasContent, print };
  },
});
</script>

<style scoped lang="scss"></style>
