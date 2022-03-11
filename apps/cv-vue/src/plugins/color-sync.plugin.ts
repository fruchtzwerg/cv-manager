import { useCssVar } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, unref, watch } from 'vue';
import { useContentStore } from '../store';
import { normalizeColor } from '../utils/normalize-color.util';

export const ColorSync = {
  install: () => {
    const store = useContentStore();
    const { style } = storeToRefs(store);

    Object.keys(style.value.colors).forEach(colorKey => {
      const colorCss = useCssVar(`--${colorKey}-color`);
      const colorRef = computed(() => style.value.colors[colorKey]);

      // css -> store
      watch(colorCss, css => {
        if (!css) return;

        const value = css.startsWith('var')
          ? css.substring(4, css.length - 1)
          : css;

        style.value.colors[colorKey] = value.trim();
      });

      // store -> css
      watch(
        colorRef,
        value => {
          if (!value) return;

          const normalized = normalizeColor(value);

          colorCss.value = unref(normalized);
        },
        { deep: true, immediate: true }
      );
    });
  },
};
