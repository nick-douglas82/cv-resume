import mongoose from "mongoose";

const cached = new Map<string, Promise<typeof mongoose>>();

export function connectMongo(uri: string) {
  if (!cached.has(uri)) {
    mongoose.set("strictQuery", true);
    cached.set(uri, mongoose.connect(uri));
  }
  return cached.get(uri);
}
