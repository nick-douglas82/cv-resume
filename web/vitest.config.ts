import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./setupTests.ts'],
		include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
		exclude: ['tests/**', 'node_modules/**', '.next/**'],
	},
});


