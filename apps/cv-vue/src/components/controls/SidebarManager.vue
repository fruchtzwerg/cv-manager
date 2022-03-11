<template>
  <div class="manager">
    <draggable
      v-model="skills"
      tag="ol"
      item-key="id"
      :component-data="{ class: 'list' }"
    >
      <template #item="{ element: section, index }">
        <li class="item section">
          <h3 :class="{ first: !index }">
            <div class="ellipsis">{{ section.heading ?? '---' }}</div>
            <Button
              icon="pi pi-trash"
              class="pad-left p-button-rounded p-button-text p-button-xs p-button-danger"
              @click="confirmDeleteSection(section)"
            ></Button>
            <Checkbox v-model="section.active" :binary="true"></Checkbox>
          </h3>

          <draggable
            v-model="section.entries"
            tag="ol"
            item-key="id"
            :component-data="{ class: 'list' }"
          >
            <template #item="{ element: skill }">
              <div class="item part">
                <i class="pi pi-bars"></i>
                <div class="ellipsis">{{ skill.value }}</div>
                <Button
                  icon="pi pi-trash"
                  class="pad-left p-button-rounded p-button-text p-button-xs p-button-danger"
                  @click="confirmDeleteSkill(skill, section.id)"
                ></Button>
                <Checkbox v-model="skill.active" :binary="true"></Checkbox>
              </div>
            </template>
          </draggable>
        </li>
      </template>
    </draggable>

    <Button
      class="p-button-text p-button-rounded add-btn"
      label="Add section"
      icon="pi pi-plus"
      @click="
        addSkillSection({
          active: true,
          heading: (skills.length + 1).toString(),
        })
      "
    >
    </Button>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import draggable from 'vuedraggable';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

import { useConfrimDelete } from '../../plugins/confirm-delete.plugin';
import { useContentStore } from '../../store';

export default defineComponent({
  name: 'SidebarManager',
  components: { draggable, Button, Checkbox },
  setup() {
    const store = useContentStore();
    const { skills } = storeToRefs(store);
    const { addSkillSection, removeSkillSection, removeSkill } = store;

    const confirmDeleteSection = useConfrimDelete(removeSkillSection);
    const confirmDeleteSkill = useConfrimDelete(removeSkill);

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
