<template>
  <div class="manager">
    <!-- Sections -->
    <draggable
      v-model="content.sections"
      tag="ol"
      item-key="id"
      :component-data="{ class: 'list' }"
    >
      <template #item="{ element: section }">
        <li class="item section">
          <h3>
            <div>{{ section.heading ?? '---' }}</div>
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
                <img
                  src="../../assets/menu.svg"
                  alt="Grab here to move this element."
                  :draggable="false"
                />
                <div>{{ getHeading(part) }}</div>
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
            class="p-button-text p-button-rounded p-button-sm add-btn"
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
      class="p-button-text p-button-rounded p-button-sm add-btn"
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

import { Section, SectionPart } from '../../models/content.model';
import { useContentStore } from '../../store';

import draggable from 'vuedraggable';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';

const excludeKeys: (keyof SectionPart)[] = ['active', 'id'];
const isHeading = ([key, value]: [string, unknown]) =>
  !excludeKeys.includes(key as keyof SectionPart) && typeof value === 'string';

const toValue = ([, value]: [string, unknown]) => value;

const getHeading = (part: SectionPart) =>
  Object.entries(part).filter(isHeading).map(toValue)[0];

export default defineComponent({
  name: 'ContentManager',
  components: { draggable, Button, Checkbox, ConfirmDialog },
  setup() {
    const store = useContentStore();
    const { addPart, removePart, addSection, removeSection } = store;
    const { content } = storeToRefs(store);

    const confirm = useConfirm();

    const confirmDeleteSection = (section: Section) => {
      confirm.require({
        message: `Are you sure you want to delete ${section.heading}?`,
        header: `Delete ${section.heading}`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          removeSection(section.id);
        },
      });
    };
    const confirmDeletePart = (part: SectionPart, sectionid: Section['id']) => {
      const heading = getHeading(part);

      confirm.require({
        message: `Are you sure you want to delete ${heading}?`,
        header: `Delete ${heading}`,
        icon: 'pi pi-exclamation-triangle',
        position: 'right',
        accept: () => {
          removePart(part.id, sectionid);
        },
      } as any);
    };

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
.manager {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.item {
  display: flex;
  user-select: none;
  cursor: row-resize;

  &.section {
    flex-direction: column;

    & + .section {
      margin-top: 1rem;
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .p-button-xs {
    $size: 2rem;
    min-width: $size;
    width: $size;
    height: $size;
  }

  .pad-left {
    margin-left: auto;
  }

  &.part {
    margin-top: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.83em;

    img {
      height: 1.5em;
    }
  }
}

.add-btn {
  margin-top: 1rem;
}
</style>
