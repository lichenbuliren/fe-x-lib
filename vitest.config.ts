/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'path';
import viteConfig from './vite.config';

console.log('path.resolve', path.resolve(__dirname, './tests/setup.ts'));
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './tests/setup.ts'),
      include: ['**/*.test.tsx', '**/*.test.ts'],
    },
  }),
);
