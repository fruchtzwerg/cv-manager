<template>
  <div class="manager">
    <!-- Sections -->
    <draggable
      v-model="content.sections"
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
            v-model="section.parts"
            tag="ol"
            item-key="id"
            :component-data="{ class: 'list' }"
          >
            <template #item="{ element: part }">
              <li class="item part">
                <i class="pi pi-bars"></i>
                <div class="ellipsis">{{ getHeading(part) }}</div>
                <Button
                  icon="pi pi-trash"
                  class="pad-left p-button-rounded p-button-text p-button-xs p-button-danger"
                  @click="confirmDeletePart(part, section.id)"
                ></Button>
                <Checkbox v-model="part.active" :binary="true"></Checkbox>
              </li>
            </template>
          </draggable>

          <Button
            class="p-button-text p-button-rounded add-btn"
            label="Add paragraph"
            icon="pi pi-plus"
            @click="
              addPart(section, {
                active: true,
                pagebreak: false,
                heading: (section.parts.length + 1).toString(),
              })
            "
          >
          </Button>
        </li>
      </template>
    </draggable>

    <Button
      class="p-button-text p-button-rounded add-btn"
      label="Add section"
      icon="pi pi-plus"
      @click="
        addSection({
          active: true,
          pagebreak: false,
          heading: (content.sections.length + 1).toString(),
        })
      "
    >
    </Button>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useConfrimDelete } from '../../plugins/confirm-delete.plugin';
import { useContentStore } from '../../store';

import draggable from 'vuedraggable';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import ConfirmDialog from 'primevue/confirmdialog';

import { getHeading } from '../../utils/get-heading.util';

export default defineComponent({
  name: 'ContentManager',
  components: { draggable, Button, Checkbox, ConfirmDialog },
  setup() {
    const store = useContentStore();
    const { addPart, removePart, addSection, removeSection } = store;
    const { content } = storeToRefs(store);

    const confirmDeleteSection = useConfrimDelete(removeSection);
    const confirmDeletePart = useConfrimDelete(removePart);

    const actions = {
      addPart,
      confirmDeletePart,
      addSection,
      confirmDeleteSection,
    };

    return {
      content,
      getHeading,
      ...actions,
    };
  },
});
</script>

<style scoped lang="scss">
@use '../../styles/manager.scss';
</style>
