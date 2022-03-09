<template>
  <div class="container">
    <MouseOver v-slot="{ hovered }">
      <div
        class="screen-only field-checkbox controls"
        :style="{ opacity: hovered ? 1 : 0 }"
        v-if="hovered"
      >
        <div class="button-wrapper">
          <Button
            icon="pi pi-pencil"
            class="p-button-outlined button-sm"
            @click="(showEditor = true), $emit('open:editor', id)"
          />
        </div>
        <ToggleButton
          :binary="true"
          :model-value="pagebreak"
          class="button-sm"
          @update:model-value="$emit('update:pagebreak', $event)"
          on-icon="icon icon-pb-on"
          off-icon="icon icon-pb"
        >
        </ToggleButton>
      </div>

      <slot :visible="!showEditor"></slot>
    </MouseOver>

    <slot
      name="editor"
      :visible="showEditor"
      :close="() => (showEditor = false)"
    ></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';

import MouseOver from '../util/MouseOver.vue';

export default defineComponent({
  name: 'InlineControls',
  components: { ToggleButton, Button, MouseOver },
  props: {
    id: String,
    pagebreak: Boolean,
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

  transition: opacity 0.2s ease;
}

.field-checkbox {
  display: flex;
  gap: 1rem;
}

.button-wrapper {
  background-color: white;
  border-radius: 6px;

  .p-button {
    height: 100%;
  }
}
</style>
