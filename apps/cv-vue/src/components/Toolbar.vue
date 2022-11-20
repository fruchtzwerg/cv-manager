<template>
  <div class="navbar w-auto bg-base-100/80 backdrop-blur-md">
    <div class="flex-1">
      <div class="btn-group">
        <ContentImport />
        <ContentDownload />
        <ContentClear />
      </div>
    </div>

    <div class="max-xl:btn-group flex-none">
      <ContentPrint />
      <ToggleSidebar class="xl:!hidden" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentDownload from './controls/ContentDownload.vue';
import ContentImport from './controls/ContentImport.vue';
import ContentPrint from './controls/ContentPrint.vue';
import ContentClear from './controls/ContentClear.vue';
import ToggleSidebar from './controls/ToggleSidebar.vue';

export default defineComponent({
  name: 'Toolbar',
  components: {
    ContentDownload,
    ContentImport,
    ContentPrint,
    ContentClear,
    ToggleSidebar,
  },
});
</script>

<style scoped lang="scss"></style>
