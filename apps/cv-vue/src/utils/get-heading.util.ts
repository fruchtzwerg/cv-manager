import { Section, SectionPart } from '../models/content.model';
import { SkillSection } from '../models/skill.model';

export type StateEntry = { [key: string]: unknown } | string;
export type ValidKey = keyof Section | keyof SectionPart | keyof SkillSection;

const excludeKeys: ValidKey[] = [
  'id',
  'active',
  'pagebreak',
  'entries',
  'parts',
];

const isHeading =
  (invalidKeys = excludeKeys) =>
  ([key, value]: [string, unknown]) =>
    !invalidKeys.includes(key as ValidKey) && typeof value === 'string';

const toValue = ([, value]: [string, unknown]) => value;

export const getHeading = (part: StateEntry) =>
  typeof part === 'string'
    ? part
    : Object.entries(part).filter(isHeading()).map(toValue)[0];
