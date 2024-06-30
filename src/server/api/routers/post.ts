import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";

export const postRouter = createTRPCRouter({
    createPost: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                image: z.string(),
                description: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (!ctx.session?.user?.id) {
                throw new Error("User non connecter.");
            }

            const post = await db.post.create({
                data: {
                    ...input,
                    createdById: ctx.session?.user?.id,
                },
            });

            console.log('post créer avec succès !', post)
            return post;
        }),

    // Route pour récupérer les posts
    getPosts: protectedProcedure.query(async () => {
        return await db.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                User: true, // Inclut les informations de l'utilisateur
            },
        });
    }),
});