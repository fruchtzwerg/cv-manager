import { Component } from 'vue';
import { Icon } from '../models/contact-info.model';

import WebIcon from '~icons/fluent/globe-person-24-regular';
import PhoneIcon from '~icons/fluent/phone-28-regular';
import AddressIcon from '~icons/fluent/location-28-regular';
import MailIcon from '~icons/fluent/mention-24-regular';

export const icons: Record<Icon, Component> = {
  mail: MailIcon,
  phone: PhoneIcon,
  address: AddressIcon,
  web: WebIcon,
};
