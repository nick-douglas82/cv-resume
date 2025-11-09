import express from "express";
import { authRouter } from "./routes/auth";
import { resumesRouter } from "./routes/resumes";

const app: ReturnType<typeof express> = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/resumes", resumesRouter);

export default app;
