import dashify from 'dashify';
import degit from 'degit';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import rimraf from 'rimraf';
import { z } from 'zod';

const del = promisify(rimraf);

const REPO_PATH_REGEXP =
  /^(([A-Za-z0-9-_]+)\/)?([A-Za-z0-9-_]+)(#([A-Za-z0-9-_]+))?$/;

const RepoPathSchema = z.string().regex(REPO_PATH_REGEXP);

export function isRepository(candidate: string) {
  const result = RepoPathSchema.safeParse(candidate);
  return result.success;
}

export async function cloneRepository(repo: z.infer<typeof RepoPathSchema>) {
  const destPath = resolve(
    homedir(),
    '.propane-templates',
    toRepoDestDir(repo),
  );
  await del(destPath);

  const emitter = degit(repo, { mode: 'git' });
  await emitter.clone(destPath);
  return destPath;
}

export function toRepoDestDir(repo: z.infer<typeof RepoPathSchema>): string {
  return dashify(repo);
}
