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
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, user }) {
      // Log session and user for debugging
      console.log('Session:', session);
      console.log('User:', user);

      // Ensure user.id is available before using it
      const userId = user?.id;
      if (userId) {
        console.log('User ID:', userId);
      } else {
        console.warn('User ID is not available.');
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: userId || session.user.id,
        },
      };
    },

  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
