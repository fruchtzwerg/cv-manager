<template>
  <Modal class="btn btn-ghost btn-error gap-2" @confirmed="clear()">
    <template #trigger>
      <icon-carbon-trash-can class="text-lg" />
      <span>Clear</span>
    </template>

    <template #heading>Clear CV</template>

    <template #message>
      <div class="flex items-center gap-4">
        <icon-carbon-warning-alt class="text-4xl text-warning-content dark:text-warning" />
        <span
          >You are about to remove
          <span class="font-bold underline text-warning-content dark:text-warning">all</span>
          data. Are you sure?</span
        >
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '../dialog/Modal.vue';

import { useContentStore } from '../../store';

export default defineComponent({
  name: 'ContentClear',
  components: { Modal },

  setup() {
    const store = useContentStore();

    const clear = () => store.$reset();

    return { clear };
  },
});
</script>

<style scoped lang="scss"></style>
