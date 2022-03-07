<template>
  <h2>{{ list?.heading }}</h2>
  <ul>
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
ul {
  padding-left: 1.5rem;
}
</style>
