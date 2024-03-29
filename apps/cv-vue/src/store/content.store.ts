import { defineStore } from 'pinia';
import { Section, SectionPart } from '../models/content.model';
import { v4 as uuid } from 'uuid';
import { SectionNotFoundError } from '../utils/section-not-found.error';
import { PartNotFoundError } from '../utils/part-not-found.error';
import { Skill, SkillSection } from '../models/skill.model';
import { SkillNotFoundError } from '../utils/skill-not-found.error';
import { cloneDeep, mapValues } from 'lodash-es';
import { normalizeColor } from '../utils/normalize-color.util';
import { VERSION } from '../constants/version.const';
import { ColorKey, ContentState } from '../models/store/v1.model';

const CONTENT_DEFAULT: ContentState = {
  version: VERSION,
  contactInfo: {
    heading: 'Contact',
    records: undefined,
  },
  skills: [],
  content: {
    sections: [],
  },
  style: {
    colors: {
      primary: 'var(--indigo-900)',
      'primary-text': '#FFFFFF',
      'section-heading': '#000000',
      heading: 'var(--indigo-700)',
      title: 'var(--indigo-700)',
      caption: 'var(--indigo-900)',
      subtitle: 'var(--indigo-500)',
      href: 'var(--indigo-500)',
    },
    sidebar: {
      width: 'min-content',
    },
  },
};

export const getContentDefault = () => cloneDeep(CONTENT_DEFAULT);

export const useContentStore = defineStore('content', {
  state: (): ContentState => getContentDefault(),

  getters: {
    download: state => {
      const { version, contactInfo, skills, content, style } = state;

      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify({ version, contactInfo, skills, content, style })
      )}`;
    },
    hasContent: state => !!state.content.sections?.length,

    colors: state => ({
      hex: {
        ...mapValues(state.style.colors, normalizeColor),
      },
    }),

    activeSkills: state =>
      state.skills
        .filter(s => s.active)
        .map(s => ({ ...s, entries: s.entries.filter(skill => skill.active) })),

    activeSections: state =>
      state.content.sections
        .filter(s => s.active)
        .map(s => ({ ...s, parts: s.parts.filter(p => p.active) })),
  },

  actions: {
    // colors
    resetColor(colorKey: ColorKey) {
      const defaultColor = getContentDefault().style.colors[colorKey];
      this.style.colors[colorKey] = defaultColor;
    },
    resetColors() {
      const defaultColors = getContentDefault().style.colors;
      this.style.colors = defaultColors;
    },

    // Skills
    createSkill(value: Skill['value']): Skill {
      return { id: uuid(), active: true, value };
    },
    addSkillSection(section: Omit<SkillSection, 'id' | 'entries'>) {
      this.skills.push({ id: uuid(), entries: [], ...section });
    },
    patchSkillSection(id: SkillSection['id'], skill: Omit<SkillSection, 'id'>) {
      const index = this.skills.findIndex(s => s.id === id);
      if (index < 0) throw new SkillNotFoundError(id);

      const patch = { ...this.skills[index], id, ...skill };

      this.skills.splice(index, 1, patch);
    },
    removeSkillSection(id: SkillSection['id']) {
      const index = this.skills.findIndex(s => s.id === id);
      if (index < 0) throw new SectionNotFoundError(id);

      this.skills.splice(index, 1);
    },
    removeSkill(id: Skill['id'], sectionId: SkillSection['id']) {
      const skillSection = this.skills.find(s => s.id === sectionId);
      if (!skillSection) throw new SectionNotFoundError(sectionId);

      const index = skillSection.entries.findIndex(s => s.id === id);
      if (index < 0) throw new PartNotFoundError(sectionId);

      skillSection.entries.splice(index, 1);
    },

    // Sections
    addSection(section: Omit<Section, 'id' | 'parts'>) {
      this.content.sections.push({ id: uuid(), parts: [], ...section });
    },
    patchSection(id: Section['id'], section: Partial<Omit<Section, 'id' | 'parts'>>) {
      const index = this.content.sections.findIndex(s => s.id === id);
      if (index < 0) throw new SectionNotFoundError(id);

      this.content.sections.splice(index, 1, {
        ...this.content.sections[index],
        ...section,
      });
    },
    removeSection(id: Section['id']) {
      const index = this.content.sections.findIndex(s => s.id === id);
      if (index < 0) throw new SectionNotFoundError(id);

      this.content.sections.splice(index, 1);
    },

    // Parts
    addPart(section: Section, part: Omit<SectionPart, 'id'>) {
      const id = uuid();
      this.content.sections?.find(s => s === section)?.parts.push({ id, ...part });
    },
    patchPart(id: SectionPart['id'], sectionId: Section['id'], part: Omit<SectionPart, 'id'>) {
      const sec = this.content.sections.find(s => s.id === sectionId);
      const index = sec?.parts.findIndex(p => p.id === id);

      if (index == null || index < 0) throw new PartNotFoundError(id);

      sec?.parts.splice(index, 1, { ...sec.parts[index], ...part });
    },
    removePart(id: SectionPart['id'], sectionId: Section['id']) {
      const section = this.content.sections.find(s => s.id === sectionId);
      if (!section) throw new SectionNotFoundError(sectionId);

      const index = section.parts.findIndex(p => p.id === id);
      if (index < 0) throw new PartNotFoundError(id);

      section?.parts.splice(index, 1);
    },

    // Import
    async import(state: ContentState) {
      if (state.version !== VERSION) {
        console.log(VERSION);
        const message = `The document you are trying to load uses an old version. Some features might not work properly.\n\ncurrent: v${VERSION}\nyour: v${state.version}`;

        const confirmation = confirm(message);

        if (!confirmation) return;
      }

      this.$patch(state);
    },
  },

  persist: {
    serializer: {
      serialize: JSON.stringify,
      deserialize: value => {
        const parsed: ContentState = JSON.parse(value);

        parsed.skills = parsed.skills.map(section => ({
          ...section,
          id: section.id ?? uuid(),
          entries: section.entries.map(skill => ({
            ...skill,
            id: skill.id ?? uuid(),
          })),
        }));

        parsed.content.sections = parsed.content.sections.map(section => ({
          ...section,
          id: section.id ?? uuid(),
          parts: section.parts.map(part => ({
            ...part,
            id: part.id ?? uuid(),
          })),
        }));

        return parsed;
      },
    },
  },
});
