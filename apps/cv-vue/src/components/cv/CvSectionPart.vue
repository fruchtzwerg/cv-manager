<template>
  <div>
    <h2 v-if="heading" class="heading">{{ heading }}</h2>
    <h3 v-if="title" class="title">{{ title }}</h3>
    <h4 v-if="caption" class="caption">{{ caption }}</h4>
    <h5 v-if="subtitle" class="subtitle">{{ subtitle }}</h5>

    <a :href="href" target="_blank" rel="noopener" class="href">{{ href }}</a>

    <div v-html="text" class="text"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CvSectionPart',
  props: {
    heading: String,
    title: String,
    caption: String,
    subtitle: String,
    href: String,
    text: String,
  },
});
</script>

<style scoped lang="scss"></style>
