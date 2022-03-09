import { SkillSection } from '../models/skill.model';

export class SkillNotFoundError extends Error {
  constructor(id: SkillSection['id']) {
    super(`No skill with id '${id}' found.`);
  }
}
