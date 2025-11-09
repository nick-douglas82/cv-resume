import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'pnpm dev',
		url: 'http://localhost:3000',
		reuseExistingServer: true,
		stdout: 'pipe',
		stderr: 'pipe',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});


