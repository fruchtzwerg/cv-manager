export interface Content {
  name: string;
  sections: Section[];
}

export interface Section {
  id: string;
  active: boolean;
  pagebreak: boolean;
  heading?: string;
  parts: SectionPart[];
}

export interface SectionPart {
  id: string;
  active: boolean;
  pagebreak: boolean;
  heading?: string;
  title?: string;
  caption?: string;
  subtitle?: string;
  href?: string;
  text?: string;
}
