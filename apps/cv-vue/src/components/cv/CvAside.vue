<template>
  <!-- <aside
    :style="{ ...style.sidebar, minWidth: style.sidebar.width }"
    ref="aside"
  > -->
  <aside ref="aside">
    <InlineControls :id="'contact'">
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

    <template v-for="list in skills" :key="list.id">
      <InlineControls>
        <template #editor="{ visible, close }">
          <SkillEditor
            v-bind="list"
            v-if="visible"
            @save="saveSkills(list.id, $event), close()"
            @discard="close"
          ></SkillEditor
        ></template>

        <template v-slot="{ visible }">
          <CvAsideList v-if="visible" :list="list"></CvAsideList>
        </template>
      </InlineControls>
    </template>

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
import { useElementBounding } from '@vueuse/core';

import { SkillNotFoundError } from '../../utils/skill-not-found.error';
import { ContactInfo } from '../../models/contact-info.model';
import { Skill } from '../../models/skill.model';
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

    const { style, contactInfo, skills } = storeToRefs(store);

    const saveContact = (contactInfo: ContactInfo) =>
      store.$patch({ contactInfo });

    const saveSkills = (id: Skill['id'], skill: Omit<Skill, 'id'>) => {
      store.$patch(state => {
        const index = state.skills.findIndex(s => s.id === id);
        if (index < 0) throw new SkillNotFoundError(id);

        state.skills.splice(index, 1, { id, ...skill });
      });
    };

    const { width } = useElementBounding(aside);

    return {
      style,
      contactInfo,
      saveContact,
      saveSkills,
      skills,
      aside,
      width,
    };
  },
});
</script>

<style scoped lang="scss">
aside {
  background-color: var(--aside-background);

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
