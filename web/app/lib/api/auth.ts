import { api } from "@web/app/lib/api";
import { z } from "zod";

const LoginResponse = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  role: z.string().optional(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;

export async function apiLogin(email: string, password: string): Promise<LoginResponse | null> {
  // const res = await fetch(`${process.env.API_BASE}/auth/login`, {
  //   method: "POST",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });

  const res = await api.post("/auth/login", { email, password });

  if (res.status !== 200) return null;

  return LoginResponse.parse(res.data);
}
