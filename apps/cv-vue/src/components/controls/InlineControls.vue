<template>
  <div class="container">
    <MouseOver v-slot="{ hovered }">
      <div
        class="print:hidden field-checkbox controls"
        :style="{ opacity: hovered ? 1 : 0 }"
        v-if="hovered"
      >
        <div v-if="edit">
          <button
            class="btn btn-outline btn-square btn-secondary text-lg"
            :class="{ 'bg-white/90': page }"
            @click="(showEditor = true), $emit('open:editor', id)"
          >
            <icon-carbon-edit />
          </button>
        </div>

        <ToggleButton
          :model-value="pagebreak"
          :class="{ 'bg-white': page }"
          @update:model-value="$emit('update:pagebreak', $event)"
        >
          <icon-carbon-page-break />
        </ToggleButton>
      </div>

      <slot :visible="!showEditor"></slot>
    </MouseOver>

    <slot name="editor" :visible="showEditor" :close="() => (showEditor = false)"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import ToggleButton from '../util/ToggleButton.vue';

import MouseOver from '../util/MouseOver.vue';

export default defineComponent({
  name: 'InlineControls',
  components: { ToggleButton, MouseOver },
  props: {
    id: String,
    pagebreak: Boolean,
    edit: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:pagebreak', 'open:editor'],
  setup() {
    const showEditor = ref(false);

    return { showEditor };
  },
});
</script>

<style scoped lang="scss">
@use '../../styles/controls.scss';

.container {
  position: relative;
}
.controls {
  position: absolute;
  right: 0;
  height: 40px;

  transition: opacity 0.2s ease;
}

.field-checkbox {
  display: flex;
  gap: 1rem;
}
</style>
