<template>
  <div class="sidebar screen-only">
    <div class="scrollable">
      <div class="actions">
        <ContentImport></ContentImport>
        <ContentDownload></ContentDownload>
      </div>

      <ContentManager></ContentManager>
    </div>

    <ContentPrint class="print"></ContentPrint>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentManager from './controls/ContentManager.vue';
import ContentDownload from './controls/ContentDownload.vue';
import ContentImport from './controls/ContentImport.vue';
import ContentPrint from './controls/ContentPrint.vue';

export default defineComponent({
  name: 'Sidebar',
  components: {
    ContentManager,
    ContentDownload,
    ContentImport,
    ContentPrint,
  },
});
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
}

.scrollable {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 10rem);
}

.actions {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.5rem;
}

.print {
  margin: auto;
}
</style>
