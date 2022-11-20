<template>
  <div class="manager">
    <draggable v-model="skills" tag="ol" item-key="id" :component-data="{ class: 'list' }">
      <template #item="{ element: section, index }">
        <li class="item section">
          <h3 :class="{ first: !index }">
            <icon-carbon-drag-vertical class="text-base" />

            <div class="ellipsis">{{ section.heading ?? '---' }}</div>

            <button
              class="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/20"
              @click="confirmDeleteSection(section)"
            >
              <icon-carbon-trash-can />
            </button>

            <input type="checkbox" class="checkbox checkbox-sm" v-model="section.active" />
          </h3>

          <draggable
            v-model="section.entries"
            tag="ol"
            item-key="id"
            :component-data="{ class: 'list' }"
          >
            <template #item="{ element: skill }">
              <li class="item part">
                <icon-carbon-draggable />

                <div class="ellipsis">{{ skill.value }}</div>

                <button
                  class="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/20"
                  @click="confirmDeleteSkill(skill, section.id)"
                >
                  <icon-carbon-trash-can />
                </button>

                <input type="checkbox" class="checkbox checkbox-sm" v-model="skill.active" />
              </li>
            </template>
          </draggable>

          <div class="divider"></div>
        </li>
      </template>
    </draggable>

    <button
      class="btn-add"
      @click="
        addSkillSection({
          active: true,
          heading: (skills.length + 1).toString(),
        })
      "
    >
      <icon-carbon-add />
      Add section
    </button>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import draggable from 'vuedraggable';

import { useConfirmDelete } from '../../plugins/confirm-delete.plugin';
import { useContentStore } from '../../store';

export default defineComponent({
  name: 'SidebarManager',
  components: {
    draggable,
  },
  setup() {
    const store = useContentStore();
    const { skills } = storeToRefs(store);
    const { addSkillSection, removeSkillSection, removeSkill } = store;

    const confirmDeleteSection = useConfirmDelete(removeSkillSection);
    const confirmDeleteSkill = useConfirmDelete(removeSkill);

    return {
      skills,
      addSkillSection,
      confirmDeleteSection,
      confirmDeleteSkill,
    };
  },
});
</script>

<style scoped lang="scss">
@use '../../styles/manager.scss';
</style>
