<template>
  <aside
    :style="{ ...style.sidebar, minWidth: style.sidebar.width }"
    ref="aside"
  >
    <CvContact :info="contactInfo"></CvContact>
    <CvAsideList
      v-for="list in skills"
      :list="list"
      :key="list.heading"
    ></CvAsideList>
    <div
      id="print-bg"
      :style="{
        width: `${width}px`,
        background: style.sidebar.background,
      }"
      class="print-only"
    ></div>
  </aside>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, ref } from 'vue';
import { useContentStore } from '../../store';

import CvContact from './CvContact.vue';
import CvAsideList from './CvAsideList.vue';
import { useElementBounding } from '@vueuse/core';

export default defineComponent({
  name: 'CvAside',
  components: {
    CvContact,
    CvAsideList,
  },
  setup() {
    const aside = ref<HTMLElement>();
    const store = useContentStore();

    const { style, contactInfo, skills } = storeToRefs(store);

    const { width } = useElementBounding(aside);

    return {
      style,
      contactInfo,
      skills,
      aside,
      width,
    };
  },
});
</script>

<style scoped lang="scss">
aside {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0 1rem;
  height: 100%;
  min-height: 100vh;
}

#print-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
}

@media print {
  aside {
    position: relative;
    padding-top: 1rem;
  }
}
</style>
