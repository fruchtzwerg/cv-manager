<template>
  <button
    :class="['btn btn-square gap-2 !p-0', { '!btn-active': sidebar.open }]"
    @click="toggleSidebar()"
  >
    <icon-carbon-menu class="text-lg" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useStore } from '../../store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ContentPrint',

  setup() {
    const store = useStore();
    const { sidebar } = storeToRefs(store);
    const { toggleSidebar } = store;

    return { sidebar, toggleSidebar };
  },
});
</script>
