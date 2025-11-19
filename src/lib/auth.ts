import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AuthEvents } from "@/features/auth/domain/events/catalog";
import { logger } from "./logger";
import { env } from "./env";
import prisma from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const providers: NextAuthConfig["providers"] = [
  Google({
    allowDangerousEmailAccountLinking: true,
  }),
  GitHub({
    allowDangerousEmailAccountLinking: true,
  }),
];
const isEndToEndEnvironment = env.APP_TEST;
const isProductionEnvironment = process.env.VERCEL_ENV;

if (isEndToEndEnvironment && isProductionEnvironment) {
  throw new Error("APP_TEST should never be true in production");
}

if (isEndToEndEnvironment) {
  providers.push(
    Credentials({
      id: "password",
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: credentials => {
        if (credentials.password === "password") {
          return {
            id: "default-user",
            name: "Bob Alice",
            email: "bob@alice.com",
          };
        }
        return null;
      },
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  adapter: PrismaAdapter(prisma),
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    strategy: isEndToEndEnvironment ? "jwt" : "database",
  },
  pages: {
    error: "/auth/error",
    signIn: isEndToEndEnvironment ? undefined : "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      logger.info(
        {
          event: AuthEvents.signin_success,
          userId: user.id,
          provider: account?.provider,
        },
        AuthEvents.signin_success
      );
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = (token?.id ?? user?.id) as string;
      }
      return session;
    },
  },
});
