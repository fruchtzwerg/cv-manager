import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import { pina } from './store';
import pluginPersistance from 'pinia-plugin-persistedstate';

import { plugin } from './utils/confirm-delete.dialog';

pina.use(pluginPersistance);

createApp(App)
  .use(pina)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(plugin)
  .mount('#app');
