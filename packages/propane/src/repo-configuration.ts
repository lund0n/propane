import dashify from 'dashify';
import { z } from 'zod';

const REPO_PATH_REGEXP =
  /^(([A-Za-z0-9-_]+)\/)?([A-Za-z0-9-_]+)(#([A-Za-z0-9-_]+))?$/;

const DEFAULT_REPO_PROPS = {
  org: 'lund0n',
  repo: 'propane',
  branch: 'main',
};
const RepoPathSchema = z.string().transform((repoString) => {
  const match = REPO_PATH_REGEXP.exec(repoString);
  if (match) {
    console.log(match);
    return {
      org: match[2] ?? DEFAULT_REPO_PROPS.org,
      repo: match[3] ?? DEFAULT_REPO_PROPS.repo,
      branch: match[5] ?? DEFAULT_REPO_PROPS.branch,
    };
  }
  return DEFAULT_REPO_PROPS;
});

export function toRepoConfiguration(
  repo: z.input<typeof RepoPathSchema>,
): z.output<typeof RepoPathSchema> {
  return RepoPathSchema.parse(repo);
}

export function toRepoDestPath(repo: z.output<typeof RepoPathSchema>): string {
  return dashify(`${repo.org}-${repo.repo}-${repo.branch}`);
}

export function toGithubRepoPath({
  org,
  repo,
}: z.output<typeof RepoPathSchema>): string {
  return `git@github.com:${org}/${repo}.git`;
}
