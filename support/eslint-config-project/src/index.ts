import type { Linter } from 'eslint';

const config: Linter.Config = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: '*.ts',
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
};

export default config;
