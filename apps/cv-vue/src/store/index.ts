import { createPinia } from 'pinia';

export const pinia = createPinia();

export * from './main.store';
export * from './content.store';
export * from './print.store';
