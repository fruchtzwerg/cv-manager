<template>
  <section :class="{ pagebreak: section.pagebreak }">
    <InlineControls
      class="controls"
      v-model:pagebreak="section.pagebreak"
    ></InlineControls>

    <h1 v-if="section.heading">{{ section.heading }}</h1>

    <!-- Parts -->
    <TransitionGroup name="list">
      <div
        v-for="part in section.parts"
        :key="part.id"
        class="part"
        :class="{ pagebreak: part.pagebreak }"
      >
        <template v-if="part.active">
          <InlineControls
            class="controls"
            v-model:pagebreak="part.pagebreak"
          ></InlineControls>

          <h2 v-if="part.heading">{{ part.heading }}</h2>
          <h3 v-if="part.title">{{ part.title }}</h3>
          <h4 v-if="part.caption">{{ part.caption }}</h4>
          <h5 v-if="part.subtitle">{{ part.subtitle }}</h5>

          <a :href="part.href" target="_blank" rel="noopener">{{
            part.href
          }}</a>

          <template v-if="part.paragraphs?.length">
            <p v-for="paragraph in part.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </template>
        </template>
      </div>
    </TransitionGroup>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import InlineControls from '../util/InlineControls.vue';

import { useContentStore } from '../../store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'CvSection',
  components: { InlineControls },
  props: {
    id: String,
    styles: Object,
  },
  setup(props) {
    const store = useContentStore();
    const { content } = storeToRefs(store);

    const section = computed(
      () => content.value.sections.find(s => s.id === props.id)!
    );

    return { section };
  },
});
</script>

<style scoped lang="scss">
section {
  position: relative;
}

.controls {
  position: absolute;
  right: 0;
}

section,
.part {
  background-color: white;
}

.part + .part {
  margin-top: 3rem;
}

h1 {
  font-size: 2.25rem;
}

h2 {
  font-size: 1.65rem;
  text-decoration: underline;
  font-weight: 900;
  color: #a91a20;
}

h3 {
  font-size: 1.5rem;
  font-weight: 200;
  color: #c51f26;
}

h4 {
  font-size: 0.75rem;
  font-weight: 400;
  color: #8d161b;
}

h5 {
  color: #e1232b;
}

h3,
h4,
h5 {
  margin: 0.25rem 0;
}

p {
  color: black;
  font-family: Quicksand;
  text-align: justify;
}

a {
  color: #e1232b;
  font-size: 0.85rem;
}
</style>
