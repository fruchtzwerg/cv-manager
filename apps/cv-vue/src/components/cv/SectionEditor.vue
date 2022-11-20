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
      <button class="btn-action btn-error" @click="$emit('discard')">
        <icon-carbon-close />
      </button>
      <button
        class="btn-action btn-success"
        @click="$emit('save', { heading: headingInput?.value })"
      >
        <icon-carbon-checkmark />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SectionEditor',

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
}

.actions {
  @apply absolute right-0 h-full flex items-center gap-2;
}

.btn-action {
  @apply btn btn-circle btn-outline bg-white text-xl font-light;
}
</style>
