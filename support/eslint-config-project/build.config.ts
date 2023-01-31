import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/base', 'src/typescript'],
  clean: false,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
