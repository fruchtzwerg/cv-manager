import { defineStore } from 'pinia';

export const usePrintStore = defineStore('print', {
  state: () => ({
    height: 0,
    pixelRatio: 1,
  }),
  getters: {
    pages: state =>
      Math.max(1, Math.ceil(state.height / (29.7 * state.pixelRatio))),
  },
});
