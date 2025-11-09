import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export async function setupTestDb(): Promise<void> {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	process.env.MONGODB_URI = uri;
	await mongoose.connect(uri);
}

export async function resetDb(): Promise<void> {
	const { collections } = mongoose.connection;
	for (const name of Object.keys(collections)) {
		await collections[name].deleteMany({});
	}
}

export async function teardownTestDb(): Promise<void> {
	try {
		await mongoose.connection.dropDatabase();
		// ignore error if DB is already gone
	} catch {}
	await mongoose.disconnect();
	if (mongoServer) {
		await mongoServer.stop();
		mongoServer = null;
	}
}


