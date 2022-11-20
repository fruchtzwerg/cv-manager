<template>
  <section class="section prose" :class="{ pagebreak: section.pagebreak && section.active }">
    <template v-if="section.heading">
      <InlineControls
        :id="section.id"
        :pagebreak="section.pagebreak"
        @update:pagebreak="patchSection(section.id, { pagebreak: $event })"
      >
        <template #editor="{ visible, close }">
          <AsyncSectionEditor
            v-if="visible"
            v-bind="section"
            @save="patchSection(section.id, $event), close()"
            @discard="close"
            class="section-heading first"
          ></AsyncSectionEditor>
        </template>

        <template v-slot="{ visible }">
          <h1 v-if="visible" class="section-heading" :class="{ first: section.id === first.id }">
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
            <AsyncPartEditor
              v-if="visible"
              v-bind="part"
              @save="patchPart(part.id, section.id, $event), close()"
              @discard="close"
            ></AsyncPartEditor>
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
import { computed, defineComponent, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';

import CvSectionPart from './CvSectionPart.vue';
import InlineControls from '../controls/InlineControls.vue';

import { useContentStore } from '../../store';

const AsyncPartEditor = defineAsyncComponent(() => import('./PartEditor.vue'));
const AsyncSectionEditor = defineAsyncComponent(() => import('./SectionEditor.vue'));

export default defineComponent({
  name: 'CvSection',
  components: {
    InlineControls,
    CvSectionPart,
    AsyncPartEditor,
    AsyncSectionEditor,
  },
  props: {
    id: String,
    styles: Object,
  },
  setup(props) {
    const store = useContentStore();
    const { activeSections } = storeToRefs(store);

    const section = computed(() => activeSections.value.find(s => s.id === props.id)!);

    const first = computed(() => activeSections.value[0]);

    const { patchSection, patchPart } = store;

    const methods = { patchSection, patchPart };

    return { section, first, ...methods };
  },
});
</script>

<style scoped lang="scss">
.section:not(:last-child) {
  margin-bottom: 5rem;
}
.part:not(:last-child) {
  margin-bottom: 3rem;
}
</style>

<style lang="scss">
.title,
.caption,
.subtitle {
  margin: 0.25rem 0;
}

.editor input {
  display: block;
  border: 0;
  width: 100%;
  background: none;
}
</style>
