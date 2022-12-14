import { resolve } from 'node:path';
import { cloneRepository } from '../clone-repository';

export async function generate(templateName: string, repo: string) {
  // TODO allow support for local file system templates.

  // Clone the repo containing the template.
  const repoPath = await cloneRepository(repo);

  // Create the path to the template on the file system.
  const templatePath = resolve(repoPath, 'templates', templateName);

  console.log(templatePath);
}
