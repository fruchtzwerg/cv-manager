<template>
  <section :class="{ pagebreak: section.pagebreak && section.active }">
    <template v-if="section.heading">
      <InlineControls
        :id="section.id"
        :pagebreak="section.pagebreak"
        @update:pagebreak="patchSection(section.id, { pagebreak: $event })"
      >
        <template #editor="{ visible, close }">
          <SectionEditor
            v-if="visible"
            v-bind="section"
            @save="patchSection(section.id, $event), close()"
            @discard="close"
          ></SectionEditor>
        </template>

        <template v-slot="{ visible }">
          <h1
            v-if="visible"
            class="section-heading"
            :class="{ first: section.id === first.id }"
          >
            {{ section.heading }}
          </h1>
        </template>
      </InlineControls>
    </template>

    <!-- Parts -->
    <TransitionGroup name="list">
      <div
        v-for="part in section.parts"
        :key="part.id"
        class="part"
        :class="{ pagebreak: part.pagebreak && part.active }"
      >
        <InlineControls :id="part.id" v-model:pagebreak="part.pagebreak">
          <template #editor="{ visible, close }">
            <PartEditor
              v-if="visible"
              v-bind="part"
              @save="patchPart(part.id, section.id, $event), close()"
              @discard="close"
            ></PartEditor>
          </template>

          <template v-slot="{ visible }">
            <CvSectionPart v-if="visible" v-bind="part"></CvSectionPart>
          </template>
        </InlineControls>
      </div>
    </TransitionGroup>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import CvSectionPart from './CvSectionPart.vue';
import SectionEditor from './SectionEditor.vue';
import PartEditor from './PartEditor.vue';
import InlineControls from '../controls/InlineControls.vue';

import { useContentStore } from '../../store';

export default defineComponent({
  name: 'CvSection',
  components: {
    InlineControls,
    CvSectionPart,
    PartEditor,
    SectionEditor,
  },
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

    const first = computed(() => activeSections.value[0]);

    const { patchSection, patchPart } = store;

    const methods = { patchSection, patchPart };

    return { section, first, ...methods };
  },
});
</script>

<style scoped lang="scss">
section,
.part {
  background-color: white;
}

.part + .part {
  margin-top: 3rem;
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

  &.first {
    @media screen {
      margin-top: calc(24px * 0.83);
    }
  }
}

.heading {
  font-size: 1.65rem;
  text-decoration: underline;
  font-weight: 900;
  color: var(--indigo-700);
}

.title {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--indigo-700);
}

.caption {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--indigo-900);
}

.subtitle {
  color: var(--indigo-400);
}

.href {
  color: var(--indigo-400);
  font-size: 0.85rem;
}

.text {
  color: black;
  font-family: Quicksand;
  text-align: justify;
}

.editor input {
  display: block;
  border: 0;
  width: 100%;
  background: none;
}
</style>
