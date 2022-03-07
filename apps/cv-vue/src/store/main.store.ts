import { defineStore } from 'pinia';

interface State {
  sidebar: { open: boolean };
}

export const useStore = defineStore('main', {
  state: (): State => ({
    sidebar: {
      open: true,
    },
  }),
  persist: true,
});
