import { UseElementByPointOptions, useRafFn } from '@vueuse/core';
import { ref, unref } from 'vue';

const elementFromPoint = (x: number, y: number) => {
  /* stash current Window Scroll */
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;
  /* scroll to element */
  window.scrollTo(x, y);
  /* calculate new relative element coordinates */
  const newX = x - window.pageXOffset;
  const newY = y - window.pageYOffset;
  /* grab the element */
  const elm = document.elementFromPoint(newX, newY);
  /* revert to the previous scroll location */
  window.scrollTo(scrollX, scrollY);
  /* returned the grabbed element at the absolute coordinates */
  return elm;
};

export function useElementFromPoint(options: UseElementByPointOptions) {
  const element = ref<HTMLElement | null>(null);

  const { x, y } = options;

  const controls = useRafFn(() => {
    element.value = elementFromPoint(unref(x), unref(y)) as HTMLElement | null;
  });

  return {
    element,
    ...controls,
  };
}
