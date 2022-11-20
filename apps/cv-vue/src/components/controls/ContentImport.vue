<template>
  <button class="btn btn-ghost gap-2" @click="file.click()">
    <icon-carbon-document-import class="text-lg" />Load
  </button>

  <div class="dropdown">
    <label tabindex="0" class="btn btn-ghost w-8 p-0 !rounded-none"
      ><icon-carbon-chevron-down class="text-lg"
    /></label>
    <ul tabindex="0" class="dropdown-content p-2">
      <li v-for="item of items" :key="item.label">
        <MenuItem :item="item" />
      </li>
    </ul>
  </div>

  <input
    type="file"
    accept="application/json"
    ref="file"
    @change="fileChanged(($event.target as HTMLInputElement).files)"
  />
</template>

<script lang="tsx">
import { defineComponent, ref, FunctionalComponent, Component } from 'vue';

import { useContentStore } from '../../store';
import { useConfirmDialog } from '../../plugins/confirm-delete.plugin';

interface Item {
  label: string;
  icon: Component;
  command: () => void;
}

const MenuItem: FunctionalComponent<{ item: Item }> = ({ item }) => {
  const confirm = useConfirmDialog(item.command, {
    message: 'This will replace your current content. Are you sure?',
    icon: <icon-carbon-warning-alt class="text-4xl text-warning" />,
  });

  return (
    <button onClick={confirm}>
      {item.icon}
      {item.label}
    </button>
  );
};

export default defineComponent({
  name: 'Import',
  components: { MenuItem },

  setup() {
    const file = ref();
    const store = useContentStore();

    const items: Item[] = [
      {
        label: 'Example',
        icon: <icon-carbon-document />,
        command: async () => {
          const { example } = await import('../../constants/example.const');
          store.import(example);
        },
      },
    ];

    const fileChanged = async (files: FileList | null) => {
      const file = files?.item(0);

      if (!file) return console.warn('No file selected');

      const text = await file.text();

      try {
        store.import(JSON.parse(text));
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

.dropdown-content {
  @apply menu p-2 top-16 rounded-box w-52 shadow bg-base-100/80 backdrop-blur-sm;
}
</style>
