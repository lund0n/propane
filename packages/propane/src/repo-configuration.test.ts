import { describe, test, expect } from 'vitest';
import {
  toGithubRepoPath,
  toRepoConfiguration,
  toRepoDestPath,
} from './repo-configuration';

const DEFAULT_PROPS: ReturnType<typeof toRepoConfiguration> = {
  org: 'lund0n',
  repo: 'propane',
  branch: 'main',
};

describe('toRepoConfiguration', () => {
  test.each([
    { input: '', expected: DEFAULT_PROPS },
    {
      input: 'lund0n/propane#main',
      expected: DEFAULT_PROPS,
    },
    { input: 'lund0n/propane', expected: DEFAULT_PROPS },
    { input: 'propane', expected: DEFAULT_PROPS },
    {
      input: 'my-custom-repo',
      expected: {
        ...DEFAULT_PROPS,
        repo: 'my-custom-repo',
      },
    },
    {
      input: 'my-custom-repo#develop',
      expected: {
        ...DEFAULT_PROPS,
        repo: 'my-custom-repo',
        branch: 'develop',
      },
    },
    {
      input: 'my-organization/my-repo',
      expected: {
        ...DEFAULT_PROPS,
        org: 'my-organization',
        repo: 'my-repo',
      },
    },
  ])(
    'toRepoConfiguration($input) returns correct value',
    ({ input, expected }) => {
      expect(toRepoConfiguration(input)).toEqual(expected);
    },
  );
});

test.each([
  { input: DEFAULT_PROPS, expected: 'git@github.com:lund0n/propane.git' },
  {
    input: {
      ...DEFAULT_PROPS,
      org: 'my-org',
    },
    expected: 'git@github.com:my-org/propane.git',
  },
  {
    input: {
      ...DEFAULT_PROPS,
      org: 'my-org',
      repo: 'my-templates',
    },
    expected: 'git@github.com:my-org/my-templates.git',
  },
])('toGithubRepoPath($input) -> $expected', ({ input, expected }) => {
  expect(toGithubRepoPath(input)).toEqual(expected);
});

test.each([
  { input: DEFAULT_PROPS, expected: 'lund0n-propane-main' },
  {
    input: {
      ...DEFAULT_PROPS,
      org: 'my-org',
    },
    expected: 'my-org-propane-main',
  },
  {
    input: {
      ...DEFAULT_PROPS,
      org: 'my-org',
      repo: 'my-templates',
    },
    expected: 'my-org-my-templates-main',
  },
  {
    input: {
      org: 'my-org',
      repo: 'my-templates',
      branch: 'develop',
    },
    expected: 'my-org-my-templates-develop',
  },
])('toRepoDestPath($input) -> $expected', ({ input, expected }) => {
  expect(toRepoDestPath(input)).toEqual(expected);
});
