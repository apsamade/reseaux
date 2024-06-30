import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback", { user, account, profile });
      return true;
    },
    async session({ session, user }) {
      console.log("Session callback", { session, user });
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      console.log("JWT callback", { token, account, user });
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    signIn: "/auth/signin",
  },
};

export const getServerAuthSession = async () => {
  return await getServerSession(authOptions);
};
