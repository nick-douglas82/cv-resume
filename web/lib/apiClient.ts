import axios from "axios";
import { getServerSession } from "next-auth";
import { makeServiceJwt } from "./serviceJwt";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getServerSession();
  if (!session?.user?.id) return config;

  const token = await makeServiceJwt({
    sub: session.user.id,
    email: session.user.email ?? undefined,
  });

  config.headers = config.headers ?? {};
  config.headers["x-bff-jwt"] = token;
  return config;
});
