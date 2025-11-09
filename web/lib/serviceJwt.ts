import { type JWTPayload, SignJWT } from "jose";

const BFF_SECRET = new TextEncoder().encode(process.env.BFF_SECRET as string);

export async function makeServiceJwt(payload: JWTPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("10m").setIssuedAt().sign(BFF_SECRET);
}
