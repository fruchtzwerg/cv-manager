<template>
  <div class="toolbar">
    <div class="actions">
      <ContentImport></ContentImport>
      <ContentDownload></ContentDownload>
    </div>

    <ContentPrint></ContentPrint>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentDownload from './controls/ContentDownload.vue';
import ContentImport from './controls/ContentImport.vue';
import ContentPrint from './controls/ContentPrint.vue';

export default defineComponent({
  name: 'Toolbar',
  components: {
    ContentDownload,
    ContentImport,
    ContentPrint,
  },
});
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 0.5rem;
  height: 100%;
}
</style>

<style lang="scss">
.toolbar-item {
  border-radius: 0;

  &:focus {
    box-shadow: none;
  }
}
</style>
