import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { postRouter } from "./routers/post";

// Crée un routeur TRPC principal avec le routeur de posts
export const appRouter = createTRPCRouter({
  post: postRouter,
});

// Définition du type pour l'API
export type AppRouter = typeof appRouter;

/**
 * Crée un appelant côté serveur pour l'API tRPC.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
