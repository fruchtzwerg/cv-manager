<template>
  <Toolbar id="toolbar" class="screen-only"></Toolbar>

  <Preview id="preview"></Preview>
  <Sidebar
    id="sidebar"
    class="screen-only"
    :style="{ width: sidebar.open ? 'var(--sidebar-width)' : 0 }"
  ></Sidebar>
</template>

<script lang="ts">
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useStore } from './store/main.store';

import Toolbar from './components/Toolbar.vue';
import Preview from './components/Preview.vue';
import Sidebar from './components/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Toolbar,
    Preview,
    Sidebar,
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

#toolbar {
  position: fixed;
  top: 0;
  height: 4rem;
  width: 100vw;
  background-color: white;
  z-index: 999;

  @include mat.elevation(6);
}

#preview {
  $A4-width: 21cm;
  width: $A4-width;
  min-width: $A4-width;

  @media screen {
    margin: 7rem auto;
    border-radius: 1rem;
    overflow: hidden;
    @include mat.elevation(4);
  }
}

#sidebar {
  position: fixed;
  top: 7rem;
  bottom: 3.75rem;
  right: 0;
  transition: width 0.5s ease-out;
}
</style>

<style lang="scss">
@import './styles/cv-aside.scss';

:root {
  --sidebar-width: 20rem;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  * {
    -webkit-print-color-adjust: exact !important; /* Chrome, Safari, Edge */
    color-adjust: exact !important; /*Firefox*/
  }
}

@media print {
  .pagebreak {
    page-break-before: always;
    margin-top: 2rem !important;
  }
}

.screen-only {
  @media print {
    display: none !important;
  }
}

.print-only {
  @media screen {
    display: none !important;
  }
}

body {
  margin: 0;
  background-color: var(--gray-200);
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: var(--bluegray-800);

  @media screen {
    display: block;
    margin-right: var(--sidebar-width);
  }
}

// fix inner transition
.list-move .list-move {
  transition: none !important;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.icon {
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.5rem;
  width: 1.5rem;
  position: relative;

  &-pb {
    background: url('./assets/page-break.svg');
  }
  &-pb-on {
    background: url('./assets/page-break-active.svg');
  }
}

.fab {
  height: 6rem !important;
  width: 6rem !important;

  & .p-button-icon {
    font-size: 2rem;
  }
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
