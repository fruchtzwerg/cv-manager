<template>
  <div class="sidebar screen-only">
    <ContentManager></ContentManager>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ContentManager from './controls/ContentManager.vue';

export default defineComponent({
  name: 'Sidebar',
  components: {
    ContentManager,
  },
});
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
