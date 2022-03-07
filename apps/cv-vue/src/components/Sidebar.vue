<template>
  <div class="sidebar screen-only">
    <ContentManager></ContentManager>

    <div class="actions">
      <ContentImport></ContentImport>
      <ContentDownload></ContentDownload>
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
  background: white;

  // @media print {
  //   display: none;
  // }
}

.actions {
  display: flex;
  justify-content: space-evenly;
}

.print {
  margin: auto;
}
</style>
