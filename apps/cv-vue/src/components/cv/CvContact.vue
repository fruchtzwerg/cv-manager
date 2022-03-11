<template>
  <h1 class="aside-heading">{{ heading }}</h1>

  <section class="contact aside-text">
    <template v-for="(value, key) in records" :key="key">
      <div v-if="Array.isArray(value)" class="multiline">
        <template v-if="value[0]">
          <component :is="icons[key]"></component>

          <template v-for="substring in value" :key="substring">
            <span>{{ substring }}</span>
            <br />
          </template>
        </template>
      </div>

      <div v-else class="line" :class="{}">
        <template v-if="value">
          <component :is="icons[key]"></component>

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
        </template>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ContactInfo } from '../../models/contact-info.model';
import { icons } from '../../constants/icons.const';

export default defineComponent({
  name: 'CvContact',
  components: {
    ...(Object.values(icons) as any),
  },
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
    color: var(--primary-text-color);
  }
}

.icon-placeholder {
  width: 1em;
}
</style>
