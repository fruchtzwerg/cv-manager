import { SectionPart } from '../models/content.model';

export class PartNotFoundError extends Error {
  constructor(id: SectionPart['id']) {
    super(`No part with id '${id}' found.`);
  }
}
