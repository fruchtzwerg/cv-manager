import { useCssVar } from '@vueuse/core';
import { unref } from 'vue';

export function normalizeColor(value: string) {
  switch (true) {
    case value.startsWith('var'): {
      const varName = value.substring(4, value.length - 1);
      const css = useCssVar(varName);

      return unref(css);
    }
    case value.startsWith('--'): {
      const css = useCssVar(value);

      return unref(css);
    }

    default:
      return value;
  }
}
