import { Section } from '../models/content.model';

export class SectionNotFoundError extends Error {
  constructor(id: Section['id']) {
    super(`No section with id '${id}' found.`);
  }
}
