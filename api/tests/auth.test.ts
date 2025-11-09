import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

describe("POST /api/auth/login", () => {
  it("returns 400 when body is missing fields", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "email and password required" });
  });
});
