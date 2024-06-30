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

// Déclaration des extensions de type pour NextAuth
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string; // Ajout d'un id optionnel à la session utilisateur
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string; // Ajout d'un id optionnel au JWT
  }
}

// Options de configuration de NextAuth
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
      return true; // Autorise la connexion
    },
    async session({ session, token }) {
      console.log("Session callback", { session, token });

      // Ajoute l'id de l'utilisateur au session si disponible
      if (session.user && typeof token.id === 'string') {
        session.user.id = token.id;
      }

      return session;
    },
    async jwt({ token, account, user }) {
      console.log("JWT callback", { token, account, user });

      // Lors de la connexion, stocke l'id de l'utilisateur dans le token
      if (user?.id) {
        token.id = user.id;
      }

      // Stocke le accessToken dans le token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
  secret: env.NEXTAUTH_SECRET, // Assurez-vous que NEXTAUTH_SECRET est défini
  session: {
    strategy: "jwt", // Utilise JWT pour la gestion de session
  },
  pages: {
    signIn: "/auth/signin", // Redirige vers la page de connexion personnalisée
  },
};

// Fonction pour obtenir la session d'authentification côté serveur
export const getServerAuthSession = async () => {
  return await getServerSession(authOptions);
};
