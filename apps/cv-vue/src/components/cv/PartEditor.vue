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
      <Button
        class="p-button-outlined p-button-rounded"
        label="Discard"
        icon="pi pi-times"
        @click="$emit('discard')"
      ></Button>
      <Button
        class="p-button-raised p-button-rounded"
        label="Save"
        icon="pi pi-check"
        @click="$emit('save', result)"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import Editor from 'primevue/editor';
import Button from 'primevue/button';

const trimEnd = (text: string | undefined, tail = '<p><br></p>'): string => {
  if (!text) return '';

  return text.endsWith(tail)
    ? trimEnd(text.slice(0, text.length - tail.length))
    : text;
};

const trimEmpty = (props: any) =>
  Object.entries(props).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value || undefined }),
    {}
  );

export default defineComponent({
  name: 'PartEditor',
  components: { Editor, Button },
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
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
