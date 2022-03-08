<template>
  <h2 class="aside-heading">{{ list?.heading }}</h2>
  <ul class="aside-text aside-list">
    <li v-for="value in list?.entries" :key="value">{{ value }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CvAsideList',
  props: {
    list: Object,
  },
});
</script>

<style scoped lang="scss">
h2 {
  font-size: var(--aside-heading-font-size);
}
</style>
