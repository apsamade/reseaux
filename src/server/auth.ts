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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signIn({ user, account, profile }) {

      return true
    },
    session({ session, user }) {
      console.log('session session : ', session)
      console.log('session user : ',user)

      if (session.user) {
        session.user.id = user.id;
      }

      return session
    },
    jwt({ token, account }) {
      console.log('token token : ',token)
      console.log('token account : ',account)

      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
