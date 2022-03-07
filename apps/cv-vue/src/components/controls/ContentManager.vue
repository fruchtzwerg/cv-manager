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
            {{ section.heading ?? '---' }}
            <Checkbox v-model="section.active" :binary="true"></Checkbox>
          </h3>

          <button
            @click="
              addPart(section, {
                active: true,
                pagebreak: false,
                heading: section.parts.length.toString(),
              })
            "
          >
            add
          </button>
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
                <Checkbox v-model="part.active" :binary="true"></Checkbox>
              </li>
            </template>
          </draggable>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { SectionPart } from '../../models/content.model';
import { useContentStore } from '../../store';

import draggable from 'vuedraggable';
import Checkbox from 'primevue/checkbox';

const excludeKeys: (keyof SectionPart)[] = ['active', 'id', 'paragraphs'];
const isHeading = ([key, value]: [string, unknown]) =>
  !excludeKeys.includes(key as keyof SectionPart) && typeof value === 'string';

const toValue = ([, value]: [string, unknown]) => value;

const getHeading = (part: SectionPart) =>
  Object.entries(part).filter(isHeading).map(toValue)[0];

export default defineComponent({
  name: 'ContentManager',
  components: { draggable, Checkbox },
  setup() {
    const store = useContentStore();
    const { addPart } = store;

    const { content } = storeToRefs(store);

    return { content, getHeading, addPart };
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
  list-style-type: none;
}

.p-checkbox {
  margin-left: auto;
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
    }
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
</style>
