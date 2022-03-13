<template>
  <h1 class="aside-heading first">{{ heading }}</h1>

  <section class="contact aside-text">
    <template v-for="(value, key) in records" :key="key">
      <div v-if="Array.isArray(value)" class="multiline">
        <template v-if="value[0]">
          <component :is="icons[key]"></component>

          <template v-for="substring in value" :key="substring">
            <div class="c-wrapper">
              <span v-fitty>{{ substring }}</span>
            </div>
            <br />
          </template>
        </template>
      </div>

      <div v-else class="line">
        <template v-if="value">
          <component :is="icons[key]"></component>

          <div class="c-wrapper">
            <!-- Mail -->
            <a v-if="key === 'mail'" :href="`mailto:${value}`" v-fitty>
              {{ value }}
            </a>
            <!-- Phone -->
            <a v-else-if="key === 'phone'" :href="`tel:${value}`" v-fitty>
              {{ value }}
            </a>
            <!-- Web -->
            <a
              v-else-if="key === 'web'"
              :href="normalizeHref(value)"
              target="_blank"
              rel="noopener"
              v-fitty
            >
              {{ value }}
            </a>
            <!-- Address -->
            <span v-else v-fitty>{{ value }}</span>
          </div>
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
import { fitty } from '../../directives/fitty';

export default defineComponent({
  name: 'CvContact',
  components: {
    ...(Object.values(icons) as any),
  },
  directives: {
    fitty,
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

.c-wrapper {
  display: flex;
  max-width: calc(7cm - 4rem);
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
