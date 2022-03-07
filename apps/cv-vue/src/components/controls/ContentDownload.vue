<template>
  <Button
    label="Save"
    icon="pi pi-save"
    class="p-button-rounded p-button-outlined"
    @click="createDownload(download)"
  />
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import Button from 'primevue/button';

import { useContentStore } from '../../store';

const createDownload = (href: string) => {
  const anchor = document.createElement('a');

  anchor.href = href;
  anchor.setAttribute('download', 'cv.json');

  anchor.click();
  anchor.remove();
};

export default defineComponent({
  name: 'ContentDownload',
  components: { Button },
  setup() {
    const store = useContentStore();
    const { download } = storeToRefs(store);

    return { download, createDownload };
  },
});
</script>

<style scoped lang="scss">
a {
  display: none;
}
</style>
