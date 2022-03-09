import { Entry } from './entry.model';

export interface SkillSection extends Entry {
  heading: string;
  entries: Skill[];
}

export interface Skill extends Entry {
  value: string;
}
