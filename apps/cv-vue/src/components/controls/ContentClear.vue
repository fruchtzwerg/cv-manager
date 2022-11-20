<template>
  <button class="btn btn-ghost btn-error" @click="confirmClear()">
    <icon-carbon-trash-can class="text-lg" />
    Clear
  </button>
</template>

<script lang="tsx">
import { defineComponent, FunctionalComponent } from 'vue';
import { useConfirmDialog } from '../../plugins/confirm-delete.plugin';

import { useContentStore } from '../../store';

const Message: FunctionalComponent = () => (
  <span>
    <>You are about to remove </>
    <span class="font-bold underline text-warning-content dark:text-warning">all</span>
    <> data. Are you sure?</>
  </span>
);

export default defineComponent({
  name: 'ContentClear',

  setup() {
    const store = useContentStore();
    const confirmClear = useConfirmDialog(() => store.$reset(), {
      message: <Message />,
      icon: <icon-carbon-warning-alt class="text-4xl text-warning" />,
    });

    return { confirmClear };
  },
});
</script>

<style scoped lang="scss"></style>
