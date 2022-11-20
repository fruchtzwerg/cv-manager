import { Component } from 'vue';

export interface ConfirmationOptions {
  message?: string | Component;
  header: string;
  icon: Component;
  accept: <T = any>(data: T) => void;
}
