import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import clone from 'git-clone/promise.js';
import rimraf from 'rimraf';

import {
  toRepoConfiguration,
  toGithubRepoPath,
  toRepoDestPath,
} from './repo-configuration';

const del = promisify(rimraf);

function toDestPath(repoPath: string) {
  return resolve(homedir(), '.propane-templates', repoPath);
}

export async function cloneRepository(repo: string) {
  const repoConfig = toRepoConfiguration(repo);
  const destPath = toDestPath(toRepoDestPath(repoConfig));
  await del(destPath);
  await clone(toGithubRepoPath(repoConfig), destPath, {
    checkout: repoConfig.branch,
    shallow: true,
  });
  await del(resolve(destPath, '.git'));
  return destPath;
}
