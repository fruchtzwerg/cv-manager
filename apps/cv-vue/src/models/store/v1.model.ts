import { CSSProperties } from 'vue';
import { ContactInfo } from '../contact-info.model';
import { Content } from '../content.model';
import { SkillSection } from '../skill.model';

type ComponentStyle = 'sidebar';
export type ColorKey =
  | 'primary'
  | 'primary-text'
  | 'section-heading'
  | 'heading'
  | 'title'
  | 'caption'
  | 'subtitle'
  | 'href';

interface Style extends Record<ComponentStyle, CSSProperties> {
  colors: Record<ColorKey, string>;
}

export interface ContentState {
  version: 1;
  contactInfo: Partial<ContactInfo>;
  skills: SkillSection[];
  content: Content;
  style: Style;
}
