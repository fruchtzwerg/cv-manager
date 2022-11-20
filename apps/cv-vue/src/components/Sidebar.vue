<template>
  <div class="w-80 bg-base-100/80 backdrop-blur-md shadow-md overflow-auto">
    <div class="tabs flex-nowrap w-full justify-center">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.label"
        :class="['tab', { 'tab-active': sidebar.active === index }]"
        @click="sidebar.active = index"
      >
        <component :is="tab.icon"></component>
        {{ tab.label }}
      </button>
    </div>

    <component :is="tabs[sidebar.active].component"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import { tabs } from '../constants/tabs.const';
import { useStore } from '../store';

export default defineComponent({
  name: 'Sidebar',
  components: {
    ...(tabs.map(tab => tab.component) as any),
    ...(tabs.map(tab => tab.icon) as any),
  },
  setup() {
    const store = useStore();
    const { sidebar } = storeToRefs(store);

    return { sidebar, tabs };
  },
});
</script>

<style scoped lang="scss">
.tab {
  @apply tab-lg tab-bordered flex-nowrap gap-2;
}
</style>
