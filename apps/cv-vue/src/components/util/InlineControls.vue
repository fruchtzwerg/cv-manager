<template>
  <div class="screen-only field-checkbox">
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
import ToggleButton from 'primevue/togglebutton';

export default defineComponent({
  name: 'InlineControls',
  components: { ToggleButton },
  props: {
    pagebreak: Boolean,
  },
  emits: ['update:pagebreak'],
});
</script>

<style scoped lang="scss"></style>
