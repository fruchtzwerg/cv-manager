<template>
  <div class="editor">
    <input
      class="section-heading"
      ref="headingInput"
      :value="heading"
      @input="cache.heading = ($event.target as any)?.value"
      @keyup.enter="$emit('save', { heading: headingInput?.value })"
    />

    <div class="actions">
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-outlined"
        @click="$emit('discard')"
      ></Button>
      <Button
        icon="pi pi-check"
        class="p-button-rounded p-button-raised"
        @click="$emit('save', { heading: headingInput?.value })"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from 'primevue/button';

export default defineComponent({
  name: 'SectionEditor',
  components: { Button },
  props: {
    id: String,
    heading: String,
  },
  emits: ['save', 'discard'],
  setup(props) {
    const headingInput = ref<HTMLInputElement>();
    const cache = ref({ ...props });

    const focus = () => {
      headingInput.value?.focus();
    };

    return { cache, headingInput, focus };
  },
});
</script>

<style scoped lang="scss">
.editor {
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
