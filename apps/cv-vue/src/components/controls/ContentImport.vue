<template>
  <input
    type="file"
    accept="application/json"
    ref="file"
    @change="fileChanged(($event.target as HTMLInputElement).files)"
  />
  <SplitButton
    label="Load"
    icon="pi pi-download"
    class="p-button-text toolbar-item"
    @click="file.click()"
    :model="items"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import SplitButton from 'primevue/splitbutton';

import { useContentStore } from '../../store';
import { useConfirm } from 'primevue/useconfirm';
import { example } from '../../constants/example.const';

export default defineComponent({
  name: 'Import',
  components: { SplitButton },
  setup() {
    const confirm = useConfirm();
    const file = ref();
    const store = useContentStore();

    const items = [
      {
        label: 'Example',
        icon: 'pi pi-file',
        command: () =>
          confirm.require({
            header: 'Delete Content',
            message: 'This will replace your current content. Are you sure?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => store.$patch(example),
          }),
      },
    ];

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

    return { file, fileChanged, items };
  },
});
</script>

<style scoped lang="scss">
input {
  display: none;
}
</style>
