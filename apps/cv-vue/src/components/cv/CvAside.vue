<template>
  <aside ref="aside" class="print:relative" :style="{ width: style.sidebar.width }">
    <div class="aside-section">
      <InlineControls :id="'contact'" page>
        <template #editor="{ visible, close }">
          <AsyncContactEditor
            v-if="visible"
            v-bind="contactInfo"
            @save="saveContact($event), close()"
            @discard="close"
          ></AsyncContactEditor>
        </template>

        <template v-slot="{ visible }">
          <CvContact v-if="visible" v-bind="contactInfo"></CvContact>
        </template>
      </InlineControls>
    </div>

    <TransitionGroup name="list">
      <div v-for="list in activeSkills" :key="list.id" class="aside-section">
        <InlineControls :page="false">
          <template #editor="{ visible, close }">
            <AsyncSkillEditor
              v-bind="list"
              v-if="visible"
              @save="patchSkillSection(list.id, $event), close()"
              @discard="close"
            ></AsyncSkillEditor
          ></template>

          <template v-slot="{ visible }">
            <CvAsideList v-if="visible" :list="list"></CvAsideList>
          </template>
        </InlineControls>
      </div>
    </TransitionGroup>

    <div id="print-bg" :style="{ width: `${width}px` }" class="screen:hidden"></div>
  </aside>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useElementBounding } from '@vueuse/core';

import { ContactInfo } from '../../models/contact-info.model';
import { useContentStore } from '../../store';

import CvContact from './CvContact.vue';
import CvAsideList from './CvAsideList.vue';
import InlineControls from '../controls/InlineControls.vue';

const AsyncContactEditor = defineAsyncComponent(() => import('./ContactEditor.vue'));
const AsyncSkillEditor = defineAsyncComponent(() => import('./SkillEditor.vue'));

export default defineComponent({
  name: 'CvAside',
  components: {
    CvContact,
    CvAsideList,
    AsyncContactEditor,
    AsyncSkillEditor,
    InlineControls,
  },
  setup() {
    const aside = ref<HTMLElement>();
    const store = useContentStore();

    const { patchSkillSection } = store;
    const { style, contactInfo, activeSkills } = storeToRefs(store);

    const saveContact = (contactInfo: ContactInfo) => store.$patch({ contactInfo });

    const { width } = useElementBounding(aside);

    return {
      style,
      contactInfo,
      saveContact,
      patchSkillSection,
      activeSkills,
      aside,
      width,
    };
  },
});
</script>

<style scoped lang="scss">
.aside-section:not(:last-child) {
  margin-bottom: 3rem;
}

aside {
  @apply bg-[var(--aside-background)] z-0 px-4 py-8 min-h-screen max-w-[7cm];
}

#print-bg {
  @apply fixed top-0 left-0 bottom-0 -z-10;
  background-color: var(--aside-background);
}
</style>
