import SidebarManager from '../components/controls/SidebarManager.vue';
import ContentManager from '../components/controls/ContentManager.vue';
import SettingsManager from '../components/controls/SettingsManager.vue';

import IconSidePanel from '~icons/carbon/side-panel-close-filled';
import IconTextLineSpacing from '~icons/carbon/text-line-spacing';
import IconSettingsAdjust from '~icons/carbon/settings-adjust';

import { Component } from 'vue';

interface Tab {
  label: string;
  icon: Component;
  component: Component;
}

export const tabs: Tab[] = [
  {
    label: 'Aside',
    icon: IconSidePanel,
    component: SidebarManager,
  },
  { label: 'Content', icon: IconTextLineSpacing, component: ContentManager },
  { label: '', icon: IconSettingsAdjust, component: SettingsManager },
];
