import * as argon2 from "argon2";
import { User } from "../models/User";

export async function verifyCredentials(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalized }).lean();

  if (!user) return null;

  const ok = await argon2.verify(user.password, password);
  if (!ok) return null;

  return { id: String(user._id), email: user.email, name: user.name ?? null };
}
