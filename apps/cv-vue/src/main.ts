import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import { pinia } from './store';
import pluginPersistance from 'pinia-plugin-persistedstate';

import { ConfirmDeleteDialogPlugin } from './plugins/confirm-delete.plugin';
import { ColorSync } from './plugins/color-sync.plugin';

pinia.use(pluginPersistance);

createApp(App)
  .use(pinia)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ConfirmDeleteDialogPlugin)
  .use(ColorSync)
  .mount('#app');
