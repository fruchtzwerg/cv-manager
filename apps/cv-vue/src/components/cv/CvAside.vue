<template>
  <aside ref="aside" :style="{ width: style.sidebar.width }">
    <div class="aside-section">
      <InlineControls :id="'contact'" :page="false">
        <template #editor="{ visible, close }">
          <ContactEditor
            v-if="visible"
            v-bind="contactInfo"
            @save="saveContact($event), close()"
            @discard="close"
          ></ContactEditor>
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
            <SkillEditor
              v-bind="list"
              v-if="visible"
              @save="patchSkillSection(list.id, $event), close()"
              @discard="close"
            ></SkillEditor
          ></template>

          <template v-slot="{ visible }">
            <CvAsideList v-if="visible" :list="list"></CvAsideList>
          </template>
        </InlineControls>
      </div>
    </TransitionGroup>

    <div
      id="print-bg"
      :style="{ width: `${width}px` }"
      class="print-only"
    ></div>
  </aside>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, ref } from 'vue';
import { useElementBounding } from '@vueuse/core';

import { ContactInfo } from '../../models/contact-info.model';
import { useContentStore } from '../../store';

import CvContact from './CvContact.vue';
import ContactEditor from './ContactEditor.vue';
import SkillEditor from './SkillEditor.vue';
import CvAsideList from './CvAsideList.vue';
import InlineControls from '../controls/InlineControls.vue';

export default defineComponent({
  name: 'CvAside',
  components: {
    CvContact,
    CvAsideList,
    ContactEditor,
    SkillEditor,
    InlineControls,
  },
  setup() {
    const aside = ref<HTMLElement>();
    const store = useContentStore();

    const { patchSkillSection } = store;
    const { style, contactInfo, activeSkills } = storeToRefs(store);

    const saveContact = (contactInfo: ContactInfo) =>
      store.$patch({ contactInfo });

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
  background-color: var(--aside-background);
  z-index: 0;

  padding: 2rem 1rem;
  min-height: 100vh;
  min-width: 256px;
}

#print-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  background-color: var(--aside-background);
}

@media print {
  aside {
    position: relative;
  }
}
</style>
