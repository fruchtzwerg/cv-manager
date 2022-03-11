import SidebarManager from '../components/controls/SidebarManager.vue';
import ContentManager from '../components/controls/ContentManager.vue';
import SettingsManager from '../components/controls/SettingsManager.vue';

import ContentIcon from '../components/icons/TextIcon.vue';
import AsideIcon from '../components/icons/AsideIcon.vue';
import SettingsIcon from '../components/icons/SettingsIcon.vue';

import { Component } from 'vue';

interface Tab {
  label: string;
  icon: Component;
  component: Component;
}

export const tabs: Tab[] = [
  { label: 'Sidebar', icon: AsideIcon, component: SidebarManager },
  { label: 'Content', icon: ContentIcon, component: ContentManager },
  { label: '', icon: SettingsIcon, component: SettingsManager },
];
