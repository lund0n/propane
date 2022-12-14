import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      inline: ['vitest-mock-process'],
    },
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/test-helpers.ts'],
    },
  },
});
