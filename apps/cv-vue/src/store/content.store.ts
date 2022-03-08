import { defineStore } from 'pinia';
import { Section, SectionPart } from '../models/content.model';
import { v4 as uuid } from 'uuid';
import { CSSProperties } from 'vue';
import { SectionNotFoundError } from '../utils/section-not-found.error';
import { PartNotFoundError } from '../utils/part-not-found.error';
import { Skill } from '../models/skill.model';
import { ContactInfo } from '../models/contact-info.model';

interface Content {
  sections: Section[];
}

type Style = 'sidebar';

interface ContentState {
  contactInfo: Partial<ContactInfo>;
  skills: Skill[];
  content: Content;
  style: Record<Style, CSSProperties>;
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    contactInfo: {
      heading: 'Contact',
    },
    skills: [],
    content: {
      sections: [],
    },
    style: {
      sidebar: {
        width: 'min-content',
      },
    },
  }),

  getters: {
    download: state => {
      const { contactInfo, skills, content, style } = state;

      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify({ contactInfo, skills, content, style })
      )}`;
    },
    hasContent: state => !!state.content.sections?.length,
    activeSections: state =>
      state.content.sections
        .filter(s => s.active)
        .map(s => ({ ...s, parts: s.parts.filter(p => p.active) })),
  },

  actions: {
    addSection(section: Omit<Section, 'id' | 'parts'>) {
      this.content.sections.push({ id: uuid(), parts: [], ...section });
    },
    patchSection(
      id: Section['id'],
      section: Partial<Omit<Section, 'id' | 'parts'>>
    ) {
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

    addPart(section: Section, part: Omit<SectionPart, 'id'>) {
      const id = uuid();
      this.content.sections
        ?.find(s => s === section)
        ?.parts.push({ id, ...part });
    },
    patchPart(
      id: SectionPart['id'],
      sectionId: Section['id'],
      part: Omit<SectionPart, 'id'>
    ) {
      const sec = this.content.sections.find(s => s.id === sectionId);
      const index = sec?.parts.findIndex(p => p.id === id);

      if (index == null || index < 0) throw new PartNotFoundError(id);

      sec?.parts.splice(index, 1, { ...sec.parts[index], ...part });
    },
    removePart(id: SectionPart['id'], sectionId: Section['id']) {
      const sec = this.content.sections.find(s => s.id === sectionId);
      const index = sec?.parts.findIndex(p => p.id === id);

      if (index == null || index < 0) throw new PartNotFoundError(id);

      sec?.parts.splice(index, 1);
    },
  },

  persist: true,
});
