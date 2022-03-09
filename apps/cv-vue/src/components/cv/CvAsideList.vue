<template>
  <h2 class="aside-heading">{{ list?.heading }}</h2>

  <TransitionGroup tag="ul" name="list" class="aside-text aside-list">
    <li v-for="skill in list?.entries" :key="skill.id">{{ skill.value }}</li>
  </TransitionGroup>
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
