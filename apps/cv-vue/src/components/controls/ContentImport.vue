<template>
  <input
    type="file"
    accept="application/json"
    ref="file"
    @change="fileChanged(($event.target as HTMLInputElement).files)"
  />
  <Button
    label="Load"
    icon="pi pi-download"
    class="p-button-text toolbar-item"
    @click="file.click()"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from 'primevue/button';

import { useContentStore } from '../../store';

export default defineComponent({
  name: 'Import',
  components: { Button },
  setup() {
    const file = ref();
    const store = useContentStore();

    const fileChanged = async (files: FileList | null) => {
      const file = files?.item(0);

      if (!file) return console.warn('No file selected');

      const text = await file.text();

      try {
        store.$patch(JSON.parse(text));
      } catch (err) {
        console.warn(err);
      }
    };

    return { file, fileChanged };
  },
});
</script>

<style scoped lang="scss">
input {
  display: none;
}
</style>
