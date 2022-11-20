<template>
  <button
    class="btn btn-outline btn-square btn-secondary text-lg"
    :class="{ 'btn-active': modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'toggle-button',

  props: { modelValue: Boolean },
  emits: ['update:modelValue'],
});
</script>
