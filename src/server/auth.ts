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
    async signIn({ user }) {
      console.log("SignIn callback", { user });
      return true;
    },
    async session({ session, token }) {
      console.log("Session callback", { session, token });
      if (session.user) {
        session.user.id = token.id as string; // Assurez-vous que 'id' est bien défini
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
  session: {
    strategy: "jwt", // Utilisez 'jwt' ou laissez par défaut pour les cookies
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const getServerAuthSession = async () => {
  return await getServerSession(authOptions);
};
