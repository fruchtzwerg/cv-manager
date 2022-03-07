import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { pina } from './store';
import pluginPersistance from 'pinia-plugin-persistedstate';

pina.use(pluginPersistance);

createApp(App).use(pina).use(PrimeVue).mount('#app');
