<template>
  <h1 class="aside-heading">{{ heading }}</h1>
  <section class="contact aside-text">
    <template v-for="(value, key) in records" :key="key">
      <template v-if="value">
        <div v-if="Array.isArray(value)" class="multiline">
          <img :src="icons[key]" />

          <template v-for="substring in value" :key="substring">
            <span>{{ substring }}</span>
            <br />
          </template>
        </div>

        <div v-else class="line" :class="{}">
          <img :src="icons[key as keyof typeof icons]" />

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
import { defineComponent, PropType } from 'vue';

import { ContactInfo } from '../../models/contact-info.model';
import { icons } from '../../constants/icons.const';

export default defineComponent({
  name: 'CvContact',
  props: {
    heading: String,
    records: Object as PropType<ContactInfo['records']>,
  },
  setup() {
    return { icons };
  },
});
</script>

<style scoped lang="scss">
h1 {
  font-size: var(--aside-heading-font-size);
}

.contact {
  text-align: start;

  a,
  a:active {
    text-decoration: none;
    color: inherit;
  }
}

.icon-placeholder {
  width: 1em;
}
</style>
