import { defineStore } from 'pinia';
import { Section, SectionPart } from '../models/content.model';
import { v4 as uuid } from 'uuid';
import { CSSProperties } from 'vue';

type Icon = 'web' | 'mail' | 'phone' | 'address';

interface Skill {
  heading: string;
  entries: string[];
}

interface Content {
  sections: Section[];
}

type Style = 'sidebar';

interface ContentState {
  contactInfo: Partial<Record<Icon, string | string[]>>;
  skills: Skill[];
  content: Content;
  style: Record<Style, CSSProperties>;
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    contactInfo: {},
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
    patchSection(id: string, section: Partial<Omit<Section, 'id' | 'parts'>>) {
      const index = this.content.sections.findIndex(s => s.id === id);

      if (index < 0) throw new Error(`No section found with id '${id}'`);

      this.content.sections.splice(index, 1, {
        ...this.content.sections[index],
        ...section,
      });
    },

    patchPart(id: string, sectionId: string, part: Omit<SectionPart, 'id'>) {
      const sec = this.content.sections.find(s => s.id === sectionId);
      const index = sec?.parts.findIndex(p => p.id === id);

      if (index == null || index < 0)
        throw new Error(`No part found with id '${id}'`);

      sec?.parts.splice(index, 1, { ...sec.parts[index], ...part });
    },

    addPart(section: Section, part: Omit<SectionPart, 'id'>) {
      const id = uuid();
      this.content.sections
        ?.find(s => s === section)
        ?.parts.push({ id, ...part });
    },
  },

  persist: true,
});
