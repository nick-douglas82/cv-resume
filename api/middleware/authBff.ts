import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

export type AuthedUser = { id: string; email: string };
export type AuthedRequest = Request & { user?: AuthedUser };

const BFF_SECRET = new TextEncoder().encode(process.env.BFF_SECRET as string);

export async function authBff(req: AuthedRequest, res: Response, next: NextFunction) {
  // read header directly (works across express/router type combos)
  const raw = req.headers["x-bff-jwt"];
  const token = Array.isArray(raw) ? raw[0] : raw;

  if (!token || typeof token !== "string") {
    res.status(401).end();
    return;
  }

  try {
    const { payload } = await jwtVerify(token, BFF_SECRET);
    req.user = {
      id: String(payload.sub),
      email: String(payload.email),
    };
    next();
  } catch {
    res.status(401).end();
  }
}
