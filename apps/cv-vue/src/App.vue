<template>
  <Toolbar id="toolbar" class="print:hidden"></Toolbar>

  <div :class="['preview-container', { 'lg:screen:mr-80': sidebar.open }]">
    <Preview id="preview"></Preview>
  </div>

  <AsyncSidebar
    id="sidebar"
    class="print:!hidden rounded-box"
    :class="{ 'max-xl:!-right-80': !sidebar.open }"
  ></AsyncSidebar>
</template>

<script lang="tsx">
import { storeToRefs } from 'pinia';
import { defineComponent, defineAsyncComponent } from 'vue';
import { useStore } from './store/main.store';

import Toolbar from './components/Toolbar.vue';
import Preview from './components/Preview.vue';

const AsyncSidebar = defineAsyncComponent({
  loader: () => import('./components/Sidebar.vue'),
  loadingComponent: () => (
    <progress class="fixed top-0 left-0 right-0 h-1 progress progress-primary w-screen"></progress>
  ),
});

export default defineComponent({
  name: 'App',
  components: {
    Toolbar,
    Preview,
    AsyncSidebar,
  },
  setup() {
    const store = useStore();

    const { sidebar } = storeToRefs(store);

    return { sidebar };
  },
});
</script>

<style lang="scss" scoped>
@use '@material/elevation' as mat;

$margin: 1rem;
$margin-top: 7rem;
$margin-bottom: 2rem;

.preview-container {
  @apply screen:flex screen:justify-center screen:mt-24 screen:xl:mr-80 transition-[margin];
}

#toolbar {
  @apply fixed top-4 left-4 right-4 rounded-box shadow-xl z-30;
}

#preview {
  $A4-width: 21cm;
  width: $A4-width;
  min-width: $A4-width;

  @media screen {
    @apply bg-transparent rounded-box overflow-hidden shadow-lg;
  }
}

#sidebar {
  @apply fixed top-24 max-h-[calc(100vh_-_7rem)] right-4 z-30 flex flex-col overflow-hidden transition-[right];
}
</style>

<style lang="scss">
@use './styles/cv-aside.scss';
@use './styles/cv-content.scss';
@use './styles/sidebar.scss';
@use './styles/animations.scss';

@tailwind base;
@tailwind components;
@tailwind utilities;

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  * {
    print-color-adjust: exact !important;
  }
}

@media print {
  .pagebreak {
    page-break-before: always;
    margin-top: 2rem !important;
  }
}

.btn-ghost.btn-error {
  @apply text-error hover:bg-error/20;
}

body {
  @apply m-0;

  background-color: var(--gray-200);
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--bluegray-800);

  @media screen {
    @apply block;
  }
}

.icon {
  @apply relative w-6 h-6 bg-no-repeat bg-contain;

  &-pb {
    background: url('./assets/page-break.svg');
  }
  &-pb-on {
    background: url('./assets/page-break-active.svg');
  }
}

.ellipsis {
  @apply text-ellipsis overflow-hidden whitespace-nowrap;

  &.wrap {
    @apply whitespace-normal;
  }
}
</style>
