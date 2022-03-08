<template>
  <div @mouseenter="hovered = true" @mouseleave="hovered = false">
    <slot :hovered="hovered"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MouseOver',

  setup() {
    const hovered = ref(false);

    return { hovered };
  },
});
</script>

<style scoped lang="scss"></style>
