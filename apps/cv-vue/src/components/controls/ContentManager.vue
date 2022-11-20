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
          <!-- section heading -->
          <h3 :class="{ first: !index }">
            <icon-carbon-drag-vertical class="text-base" />
            <div class="ellipsis">{{ section.heading ?? '---' }}</div>
            <ButtonRemove @click="confirmDeleteSection(section)" />
            <input type="checkbox" class="checkbox checkbox-sm" v-model="section.active" />
          </h3>

          <!-- paragraphs -->
          <draggable
            v-model="section.parts"
            tag="ol"
            item-key="id"
            :component-data="{ class: 'list' }"
          >
            <template #item="{ element: part }">
              <li class="item part">
                <icon-carbon-draggable />
                <div class="ellipsis">{{ getHeading(part) }}</div>
                <ButtonRemove @click="confirmDeletePart(part, section.id)" />
                <input type="checkbox" class="checkbox checkbox-sm" v-model="part.active" />
              </li>
            </template>
          </draggable>

          <ButtonAdd
            @click="
              addPart(section, {
                active: true,
                pagebreak: false,
                heading: (section.parts.length + 1).toString(),
              })
            "
          >
            Add paragraph
          </ButtonAdd>

          <div class="divider"></div>
        </li>
      </template>
    </draggable>

    <ButtonAdd
      @click="
        addSection({
          active: true,
          pagebreak: false,
          heading: (content.sections.length + 1).toString(),
        })
      "
    >
      Add section
    </ButtonAdd>
  </div>
</template>

<script lang="tsx">
import { storeToRefs } from 'pinia';
import { defineComponent, FunctionalComponent } from 'vue';

import { useConfirmDelete } from '../../plugins/confirm-delete.plugin';
import { useContentStore } from '../../store';

import draggable from 'vuedraggable';

import { getHeading } from '../../utils/get-heading.util';

const ButtonRemove: FunctionalComponent = () => (
  <button class="btn btn-circle btn-ghost btn-sm btn-error">
    <icon-carbon-trash-can />
  </button>
);

const ButtonAdd: FunctionalComponent = (_props, { slots }) => (
  <button class="btn btn-block btn-ghost gap-2 normal-case mt-2 btn-sm">
    <icon-carbon-add />
    {slots.default && slots.default()}
  </button>
);

export default defineComponent({
  name: 'ContentManager',
  components: {
    draggable,
    ButtonRemove,
    ButtonAdd,
  },
  setup() {
    const store = useContentStore();
    const { addPart, removePart, addSection, removeSection } = store;
    const { content } = storeToRefs(store);

    const confirmDeleteSection = useConfirmDelete(removeSection);
    const confirmDeletePart = useConfirmDelete(removePart);

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
