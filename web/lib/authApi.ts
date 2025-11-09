import { AxiosError } from "axios";
import { api } from "./apiClient";

export async function apiLogin(email: string, password: string) {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data as { id: string; email: string; name?: string | null };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      console.error(err.response?.data);
    } else {
      console.error(err);
    }
    return null;
  }
}
