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
      console.log('signIn user : ',user)
      console.log('signIn account : ',account)
      console.log('signIn profile : ',profile)
      return true
    },
    async session({ session, token, user }) {
      console.log('session session : ', session)
      console.log('session token : ',token)
      console.log('session user : ',user)

      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
