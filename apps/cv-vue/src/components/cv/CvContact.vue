<template>
  <h1 class="aside-heading first">{{ heading }}</h1>

  <section class="contact aside-text">
    <template v-for="(value, key) in records" :key="key">
      <div v-if="Array.isArray(value)" class="multiline">
        <template v-if="value[0]">
          <component :is="icons[key]"></component>

          <template v-for="substring in value" :key="substring">
            <span class="ellipsis">{{ substring }}</span>
            <br />
          </template>
        </template>
      </div>

      <div v-else class="line" :class="{}">
        <template v-if="value">
          <component :is="icons[key]"></component>

          <a v-if="key === 'mail'" :href="`mailto:${value}`" class="ellipsis">{{
            value
          }}</a>
          <a
            v-else-if="key === 'phone'"
            :href="`tel:${value}`"
            class="ellipsis"
            >{{ value }}</a
          >
          <a
            v-else-if="key === 'web'"
            :href="normalizeHref(value)"
            target="_blank"
            rel="noopener"
            class="ellipsis"
            >{{ value }}</a
          >
          <span v-else class="ellipsis">{{ value }}</span>
        </template>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ContactInfo } from '../../models/contact-info.model';
import { icons } from '../../constants/icons.const';
import { normalizeHref } from '../../utils/normalize-href.util';

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
    return { icons, normalizeHref };
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

.ellipsis {
  max-width: var(--aside-content-width);
}
</style>
