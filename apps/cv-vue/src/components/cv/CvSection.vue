<template>
  <section :class="{ pagebreak: section.pagebreak && section.active }">
    <template v-if="section.heading">
      <SectionEditor
        v-if="modes.section === 'edit'"
        v-bind="section"
        ref="sectionEditor"
        @save="(modes.section = 'read'), patchSection(section.id, $event)"
        @discard="modes.section = 'read'"
      ></SectionEditor>

      <template v-else>
        <InlineControls
          class="controls"
          :id="section.id"
          :pagebreak="section.pagebreak"
          @update:pagebreak="patchSection(section.id, { pagebreak: $event })"
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
          @save="
            patchPart(part.id, section.id, $event),
              modes.parts.set(part.id, 'read')
          "
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

import CvSectionPart from './CvSectionPart.vue';
import SectionEditor from './SectionEditor.vue';
import PartEditor from './PartEditor.vue';
import InlineControls from '../controls/InlineControls.vue';

import { useContentStore } from '../../store';

type EditMode = 'edit' | 'read';

export default defineComponent({
  name: 'CvSection',
  components: { InlineControls, CvSectionPart, PartEditor, SectionEditor },
  props: {
    id: String,
    styles: Object,
  },
  setup(props) {
    const store = useContentStore();
    const { activeSections } = storeToRefs(store);

    const section = computed(
      () => activeSections.value.find(s => s.id === props.id)!
    );

    const sectionEditor = ref<typeof SectionEditor>();
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

    const { patchSection, patchPart } = store;
    const showSectionEdit = () => {
      modes.value.section = 'edit';
      nextTick(() => sectionEditor.value?.focus());
    };

    const refs = { sectionEditor, hovers, modes };
    const methods = { patchSection, patchPart, showSectionEdit };

    return { section, ...refs, ...methods };
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

.editor input {
  display: block;
  border: 0;
  width: 100%;
}
</style>
