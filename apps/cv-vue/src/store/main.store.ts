import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    sidebar: {
      active: 1,
      open: true,
    },
  }),
  persist: true,
});
