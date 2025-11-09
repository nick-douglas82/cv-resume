import { Router } from "express";
import { connectMongo } from "../db/mongo";
import { verifyCredentials } from "../services/auth.service";

export const authRouter: ReturnType<typeof Router> = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    await connectMongo(process.env.MONGODB_URI as string);
    const user = await verifyCredentials(String(email), String(password));
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    return res.json(user); // { id, email, name }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});
