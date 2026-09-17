import { defineConfig } from 'vitest';

export default defineConfig({
  test: { environment: 'node', setupFiles: './src/test-setup.ts' },
});
