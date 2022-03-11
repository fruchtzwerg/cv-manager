import { Component } from 'vue';
import { Icon } from '../models/contact-info.model';

import MailIcon from '../components/icons/MailIcon.vue';
import PhoneIcon from '../components/icons/PhoneIcon.vue';
import AddressIcon from '../components/icons/AddressIcon.vue';
import WebIcon from '../components/icons/WebIcon.vue';

export const icons: Record<Icon, Component> = {
  mail: MailIcon,
  phone: PhoneIcon,
  address: AddressIcon,
  web: WebIcon,
};
