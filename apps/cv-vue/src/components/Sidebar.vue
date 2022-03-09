<template>
  <TabView
    class="tabview-custom sidebar screen-only"
    v-model:active-index="sidebar.active"
  >
    <TabPanel>
      <template #header>
        <img class="tab-icon" src="../assets/aside.svg" />
        <span>Sidebar</span>
      </template>

      <SidebarManager></SidebarManager>
    </TabPanel>

    <TabPanel>
      <template #header>
        <img class="tab-icon" src="../assets/text.svg" />
        <span>Content</span>
      </template>

      <ContentManager></ContentManager>
    </TabPanel>
  </TabView>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';

import SidebarManager from './controls/SidebarManager.vue';
import ContentManager from './controls/ContentManager.vue';
import { useStore } from '../store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Sidebar',
  components: {
    TabPanel,
    TabView,
    SidebarManager,
    ContentManager,
  },
  setup() {
    const store = useStore();
    const { sidebar } = storeToRefs(store);

    return { sidebar };
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
