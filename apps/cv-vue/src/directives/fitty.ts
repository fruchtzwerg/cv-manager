import { Directive } from 'vue';
import Fitty from 'fitty';

export const fitty: Directive = {
  created: el => Fitty(el, { minSize: 1, maxSize: 16 }),
};
