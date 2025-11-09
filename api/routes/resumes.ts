import { type Response, Router } from "express";
import { connectMongo } from "../db/mongo";
import { type AuthedRequest, authBff } from "../middleware/authBff";
import { Resume } from "../models/Resume";

export const resumesRouter: ReturnType<typeof Router> = Router();

// GET /api/resumes  → returns resumes for the authenticated user
resumesRouter.get("/", authBff, async (req: AuthedRequest, res: Response) => {
  console.log("req", req);
  try {
    await connectMongo(process.env.MONGODB_URI as string);
    const userId = req.user?.id;

    console.log("userId", userId);

    if (!userId) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const rows = await Resume.find({ userId }).sort({ updatedAt: -1 }).lean();
    const data = rows.map((row) => ({
      id: String(row._id),
      userId: String(row.userId),
      title: row.title,
      updatedAt: row.updatedAt,
    }));

    return res.json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "internal_error" });
  }
});
