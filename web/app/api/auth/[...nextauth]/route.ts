import { apiLogin, type LoginResponse } from "@web/app/lib/api/auth";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 30,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds): Promise<LoginResponse | null> {
        if (!creds?.email || !creds.password) return null;
        try {
          return await apiLogin(String(creds.email), String(creds.password));
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name ?? null;
        if (user.role) token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        if (token.email) session.user.email = token.email;
        session.user.name = token.name ?? null;
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
  },
  events: {
    signIn({ user, isNewUser }) {
      console.log("[auth] signIn", { userId: user.id, isNewUser });
    },
    signOut({ session }) {
      console.log("[auth] signOut", { userId: session?.user.id });
    },
  },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
