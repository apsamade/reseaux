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

// Étendre le type DefaultSession pour inclure un ID utilisateur optionnel
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string; // Utilisation d'un type optionnel pour `id`
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string; // Assurez-vous que `id` est bien optionnel ici aussi
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

      // Vérifiez que session.user est défini et que token.id est une chaîne avant d'assigner
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }

      return session;
    },
    async jwt({ token, account, user }) {
      console.log("JWT callback", { token, account, user });

      // Assurez-vous que `user.id` est une chaîne avant de l'assigner à `token.id`
      if (user?.id) {
        token.id = user.id;
      }
      
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
  secret: env.NEXTAUTH_SECRET, // Assurez-vous que NEXTAUTH_SECRET est bien défini dans les variables d'environnement
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export const getServerAuthSession = async () => {
  return await getServerSession(authOptions);
};
