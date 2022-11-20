<template>
  <div class="editor">
    <input v-model="cache.heading" placeholder="heading" class="heading" />
    <input v-model="cache.title" placeholder="title" class="title" />
    <input v-model="cache.caption" placeholder="caption" class="caption" />
    <input v-model="cache.subtitle" placeholder="subtitle" class="subtitle" />
    <input v-model="cache.href" placeholder="link" class="href" />

    <Editor v-model="cache.text" editorStyle="height: 320px">
      <template #toolbar>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
        </span>
        <span class="qlformats">
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </template>
    </Editor>

    <div class="actions">
      <button class="btn rounded-full gap-2 btn-outline btn-error" @click="$emit('discard')">
        <icon-carbon-close class="text-xl" />
        Discard
      </button>
      <button
        class="btn rounded-full gap-2 !btn-success shadow-sm shadow-black/30 hover:shadow-md hover:shadow-success/60"
        @click="$emit('save', result)"
      >
        <icon-carbon-checkmark class="text-lg" />
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import Editor from 'primevue/editor';

const trimEnd = (text: string | undefined, tail = '<p><br></p>'): string => {
  if (!text) return '';

  return text.endsWith(tail) ? trimEnd(text.slice(0, text.length - tail.length)) : text;
};

const trimEmpty = (props: Record<string, unknown>) =>
  Object.entries(props).reduce((acc, [key, value]) => ({ ...acc, [key]: value || undefined }), {});

export default defineComponent({
  name: 'PartEditor',
  components: { Editor },
  props: {
    heading: String,
    title: String,
    caption: String,
    subtitle: String,
    href: String,
    text: String,
  },
  emits: ['save', 'discard'],
  setup(props) {
    const cache = ref({ ...props });

    const result = computed(() => ({
      ...trimEmpty(cache.value),
      text: trimEnd(cache.value.text),
    }));

    return { cache, result, trimEnd };
  },
});
</script>

<style scoped lang="scss">
.p-editor-container {
  margin-top: 1rem;
}

.actions {
  @apply flex justify-end gap-4 mt-4;
}
</style>
