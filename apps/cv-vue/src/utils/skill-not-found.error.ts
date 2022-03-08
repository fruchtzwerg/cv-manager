import { Skill } from '../models/skill.model';

export class SkillNotFoundError extends Error {
  constructor(id: Skill['id']) {
    super(`No skill with id '${id}' found.`);
  }
}
