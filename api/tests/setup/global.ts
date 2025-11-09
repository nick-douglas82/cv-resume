import { afterAll, afterEach, beforeAll } from 'vitest';
import { resetDb, setupTestDb, teardownTestDb } from './mongo';

beforeAll(async () => {
	await setupTestDb();
});

afterEach(async () => {
	await resetDb();
});

afterAll(async () => {
	await teardownTestDb();
});


