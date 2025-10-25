import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";
import { db } from "@/lib/db";

type Role = "ADMIN" | "EDITOR" | "TUTOR" | "ALUMNE";

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Email({}),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AdapterUser & { role?: Role };
        (token as JWT & { role?: Role }).role = u.role ?? "ALUMNE";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { role?: Role }).role =
          (token as JWT & { role?: Role }).role ?? "ALUMNE";
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
