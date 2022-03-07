<template>
  <div class="screen-only field-checkbox">
    <div class="button-wrapper">
      <Button
        icon="pi pi-pencil"
        class="p-button-outlined"
        @click="$emit('open:editor', id)"
      />
    </div>
    <ToggleButton
      :binary="true"
      :model-value="pagebreak"
      @update:model-value="$emit('update:pagebreak', $event)"
      on-icon="icon icon-pb-on"
      off-icon="icon icon-pb"
    >
    </ToggleButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';

export default defineComponent({
  name: 'InlineControls',
  components: { ToggleButton, Button },
  props: {
    id: String,
    pagebreak: Boolean,
  },
  emits: ['update:pagebreak', 'open:editor'],
});
</script>

<style scoped lang="scss">
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
