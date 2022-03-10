<template>
  <Button
    label="Clear"
    icon="pi pi-trash"
    class="p-button-text toolbar-item"
    @click="clear"
  ></Button>
</template>

<script lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { defineComponent } from 'vue';

import Button from 'primevue/button';

import { useContentStore } from '../../store';

export default defineComponent({
  name: 'ContentClear',
  components: { Button },
  setup() {
    const store = useContentStore();
    const confirm = useConfirm();

    const clear = () => {
      confirm.require({
        header: 'Clear CV',
        message: 'You are about to remove ALL data. Are you sure?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => store.$reset(),
      });
    };

    return { clear };
  },
});
</script>

<style scoped lang="scss"></style>
