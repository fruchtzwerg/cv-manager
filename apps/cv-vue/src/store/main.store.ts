import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    sidebar: {
      active: 1,
      open: true,
    },
  }),

  actions: {
    toggleSidebar() {
      this.sidebar.open = !this.sidebar.open;
    },
  },

  persist: true,
});
