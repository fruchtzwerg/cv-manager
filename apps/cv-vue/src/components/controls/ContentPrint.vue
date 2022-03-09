<template>
  <Button
    icon="pi pi-print"
    :label="fab ? undefined : 'Print'"
    :class="{ 'toolbar-item': !fab, 'p-button-rounded': fab, fab }"
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
  props: {
    fab: Boolean,
  },
  setup() {
    const store = useContentStore();
    const { hasContent } = storeToRefs(store);

    const print = () => window.print();

    return { hasContent, print };
  },
});
</script>

<style scoped lang="scss">
@use '@material/elevation' as mat;

.fab {
  $size: 3rem;

  height: $size;
  width: $size;

  @include mat.elevation($z-value: 3, $opacity-boost: 0.25);
}
</style>
