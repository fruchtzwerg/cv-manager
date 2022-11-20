<template>
  <button class="btn btn-ghost gap-2" @click="createDownload(download)">
    <icon-carbon-save class="text-lg" />Save
  </button>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

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
