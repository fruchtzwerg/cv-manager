<template>
  <TabView
    class="tabview-custom sidebar screen-only"
    v-model:active-index="sidebar.active"
  >
    <TabPanel v-for="tab in tabs" :key="tab.label">
      <template #header>
        <component
          :class="{ 'tab-icon': tab.label }"
          :is="tab.icon"
        ></component>

        <span v-if="tab.label">{{ tab.label }}</span>
      </template>

      <component :is="tab.component"></component>
    </TabPanel>
  </TabView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';

import { tabs } from '../constants/tabs.const';
import { useStore } from '../store';

export default defineComponent({
  name: 'Sidebar',
  components: {
    TabPanel,
    TabView,
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
.tab-icon {
  margin-right: 0.5em;
}

.sidebar {
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss">
@use '../styles/variables.scss' as vars;

.p-tabview {
  .p-tabview-nav li {
    width: 100%;

    .p-tabview-nav-link {
      justify-content: center;

      &:not(.p-disabled):focus {
        box-shadow: none;
      }
    }
  }
  .p-tabview-nav-container {
    min-height: calc(4rem + 2px);
    overflow: hidden;
    border-top-left-radius: vars.$radius;
    border-top-right-radius: vars.$radius;
  }
  .p-tabview-panels {
    overflow-y: auto;
    border-bottom-left-radius: vars.$radius;
    border-bottom-right-radius: vars.$radius;
  }
}
</style>
