import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import rimraf from 'rimraf';

import { cloneRepository } from '../clone-repository';

import clone from 'git-clone/promise.js';
// import download from 'download-git-repo';

const del = promisify(rimraf);

// owner/name#branch
// git@github.com:lund0n/jscodeshift-demos.git
// git@github.com:procore/frontend-tooling.git

/*
{
  repo: {
    type: 'github',
    origin: 'github.com',
    owner: 'procore',
    name: 'frontend-tooling',
    checkout: 'main'
  }
}
git@github.com:procore/frontend-tooling.git
*/
export async function cloneIt() {
  // const repo = 'lund0n/jscodeshift-demos';
  // const repo = 'procore/frontend-tooling#main';

  const dest = resolve(tmpdir(), 'my-project');

  await del(dest);
  console.log(`Cloning to ${dest}...`);

  // return new Promise((resolve, reject) => {
  //   download(repo, dest, { clone: true }, function (err: unknown) {
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(dest);
  //   });
  // });
  await clone('git@github.com:procore/frontend-tooling.git', dest, {
    checkout: 'main',
    shallow: true,
  });
  await del(resolve(dest, '.git'));
}
