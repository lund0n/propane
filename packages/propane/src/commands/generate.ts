import { resolve } from 'node:path';
import { cloneRepository, isRepository } from '../utils/clone-repository';

export async function generate(templateName: string, src: string) {
  const repoFilePath = isRepository(src)
    ? await cloneRepository(src)
    : resolve(src);

  const templatePath = resolve(repoFilePath, 'templates', templateName);

  console.log(templatePath);
}
