<template>
  <section :class="{ pagebreak: section.pagebreak && section.active }">
    <template v-if="section.heading">
      <div v-if="modes.section === 'edit'" class="section-heading-container">
        <input
          :value="section.heading"
          @input="headingCache = ($event.target as any)?.value"
          class="section-heading"
          ref="sectionHeadingInput"
          @keyup.enter="
            (modes.section = 'read'),
              updateSection(section.id, { heading: sectionHeadingInput?.value })
          "
        />

        <div class="actions">
          <Button
            icon="pi pi-times"
            class="p-button-rounded p-button-raised"
            @click="modes.section = 'read'"
          ></Button>
          <Button
            icon="pi pi-check"
            class="p-button-rounded p-button-raised"
            @click="
              (modes.section = 'read'),
                updateSection(section.id, {
                  heading: sectionHeadingInput?.value,
                })
            "
          ></Button>
        </div>
      </div>

      <template v-else>
        <InlineControls
          class="controls"
          :id="section.id"
          :pagebreak="section.pagebreak"
          @update:pagebreak="updateSection(section.id, { pagebreak: $event })"
          @open:editor="showSectionEdit"
          @mouseenter="hovers.section = true"
          @mouseleave="hovers.section = false"
          :style="{ opacity: hovers.section ? 1 : 0 }"
        ></InlineControls>
        <h1
          class="section-heading"
          @mouseenter="hovers.section = true"
          @mouseleave="hovers.section = false"
        >
          {{ section.heading }}
        </h1>
      </template>
    </template>

    <!-- Parts -->
    <TransitionGroup name="list">
      <div
        v-for="part in section.parts"
        :key="part.id"
        class="part"
        :class="{ pagebreak: part.pagebreak && part.active }"
      >
        <PartEditor
          v-if="modes.parts.get(part.id) === 'edit'"
          v-bind="part"
          @save="updatePart(part.id, $event), modes.parts.set(part.id, 'read')"
          @discard="modes.parts.set(part.id, 'read')"
        ></PartEditor>

        <template v-else>
          <InlineControls
            class="controls"
            :id="part.id"
            v-model:pagebreak="part.pagebreak"
            @open:editor="modes.parts.set(part.id, 'edit')"
            @mouseenter="hovers.parts.set(part.id, true)"
            @mouseleave="hovers.parts.set(part.id, false)"
            :style="{ opacity: hovers.parts.get(part.id) ? 1 : 0 }"
          ></InlineControls>

          <CvSectionPart
            v-bind="part"
            @mouseenter="hovers.parts.set(part.id, true)"
            @mouseleave="hovers.parts.set(part.id, false)"
          ></CvSectionPart>
        </template>
      </div>
    </TransitionGroup>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue';
import { storeToRefs } from 'pinia';

import Button from 'primevue/button';
import CvSectionPart from './CvSectionPart.vue';
import PartEditor from './PartEditor.vue';
import InlineControls from '../controls/InlineControls.vue';

import { useContentStore } from '../../store';
import { Section, SectionPart } from '../../models/content.model';

type EditMode = 'edit' | 'read';

export default defineComponent({
  name: 'CvSection',
  components: { InlineControls, CvSectionPart, PartEditor, Button },
  props: {
    id: String,
    styles: Object,
  },
  setup(props) {
    const sectionHeadingInput = ref<HTMLInputElement>();

    const store = useContentStore();
    const { activeSections } = storeToRefs(store);

    const section = computed(
      () => activeSections.value.find(s => s.id === props.id)!
    );

    const headingCache = ref(section.value.heading);

    const hovers = ref({
      section: false,
      parts: new Map(section.value.parts.map(part => [part.id, false])),
    });

    const modes = ref({
      section: 'read' as EditMode,
      parts: new Map<string, EditMode>(
        section.value.parts.map(part => [part.id, 'read'])
      ),
    });

    const showSectionEdit = () => {
      modes.value.section = 'edit';
      nextTick(() => sectionHeadingInput.value?.focus());
    };

    const updateSection = (
      id: string,
      section: Partial<Omit<Section, 'id' | 'parts'>>
    ) => {
      store.$patch(state => {
        const index = state.content.sections.findIndex(s => s.id === id);

        if (index < 0) throw new Error(`No section found with id '${id}'`);

        state.content.sections.splice(index, 1, {
          ...state.content.sections[index],
          ...section,
        });
      });
    };

    const updatePart = (id: string, part: Omit<SectionPart, 'id'>) =>
      store.$patch(state => {
        const sec = state.content.sections.find(s => s.id === props.id);
        const index = sec?.parts.findIndex(p => p.id === id);

        if (index == null || index < 0)
          throw new Error(`No part found with id '${id}'`);

        sec?.parts.splice(index, 1, { ...sec.parts[index], ...part });
      });

    return {
      section,
      modes,
      hovers,
      headingCache,
      sectionHeadingInput,
      showSectionEdit,
      updateSection,
      updatePart,
      console,
    };
  },
});
</script>

<style scoped lang="scss">
section {
  position: relative;
}

input {
  border: 0;
  width: 100%;
}

.controls {
  position: absolute;
  right: 0;

  transition: opacity 0.2s ease;
}

section,
.part {
  background-color: white;
}

.part + .part {
  margin-top: 3rem;
}

.text {
  color: black;
  font-family: Quicksand;
  text-align: justify;
}

.section-heading-container {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  font-size: 2.25rem;
  margin-bottom: 0.83em;

  .actions {
    $size: calc(2.25rem + 7px);

    display: flex;
    gap: 0.5rem;

    .p-button-rounded {
      height: $size;
      width: $size;
    }
  }
}
</style>

<style lang="scss">
.title,
.caption,
.subtitle {
  margin: 0.25rem 0;
}

.section-heading {
  font-size: 2.25rem;

  &:first-of-type {
    margin-top: calc(24px * 0.83);
  }
}

.heading {
  font-size: 1.65rem;
  text-decoration: underline;
  font-weight: 900;
  color: #a91a20;
}

.title {
  font-size: 1.5rem;
  font-weight: 200;
  color: #c51f26;
}

.caption {
  font-size: 0.75rem;
  font-weight: 400;
  color: #8d161b;
}

.subtitle {
  color: #e1232b;
}

.href {
  color: #e1232b;
  font-size: 0.85rem;
}
</style>
