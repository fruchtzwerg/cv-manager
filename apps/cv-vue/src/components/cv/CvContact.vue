<template>
  <h1>Contact</h1>
  <section class="contact">
    <template v-for="(value, key) in info" :key="key">
      <template v-if="value">
        <div v-if="Array.isArray(value)" class="multiline">
          <img :src="`/icons/material/${key}.svg`" />
          <template v-for="substring in value" :key="substring">
            <span>{{ substring }}</span
            ><br />
          </template>
        </div>
        <div v-else class="line">
          <img :src="`/icons/material/${key}.svg`" />
          <a v-if="key === 'mail'" :href="`mailto:${value}`">{{ value }}</a>
          <a v-else-if="key === 'phone'" :href="`tel:${value}`">{{ value }}</a>
          <a
            v-else-if="key === 'web'"
            :href="value"
            target="_blank"
            rel="noopener"
            >{{ value }}</a
          >
          <span v-else>{{ value }}</span>
        </div>
      </template>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CvContact',
  props: {
    info: Object,
  },
});
</script>

<style scoped lang="scss">
.contact {
  text-align: start;

  a,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  .line {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }

  .multiline {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'icon street'
      'empty city';
    align-items: center;
    column-gap: 0.5em;
    row-gap: 0.15em;
  }

  .line,
  .multiline {
    img {
      height: 1em;
    }
  }
}
</style>
