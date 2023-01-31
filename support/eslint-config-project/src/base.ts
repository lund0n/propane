import type { Linter } from 'eslint';
import '@rushstack/eslint-patch/modern-module-resolution';

const config: Linter.Config = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: '*.mjs',
      env: {
        es2020: true,
      },
    },
  ],
};

export default config;
