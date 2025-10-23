// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correu", type: "text" },
        password: { label: "Contrasenya", type: "password" },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials?.password || "", user.passwordHash || "");
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
} as any;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
