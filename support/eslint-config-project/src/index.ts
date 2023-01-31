import type { Linter } from 'eslint';
import { name } from '../package.json';
import '@rushstack/eslint-patch/modern-module-resolution';

const config: Linter.Config = {
  extends: [`${name}/base`, `${name}/typescript`],
};

export default config;
