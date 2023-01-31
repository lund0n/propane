import type { Linter } from 'eslint';
import '@rushstack/eslint-patch/modern-module-resolution';

const config: Linter.Config = {
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
