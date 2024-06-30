import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "@/server/db";

export const postRouter = createTRPCRouter({
    // Route protégée pour créer un post
    createPost: protectedProcedure
        .input(
            z.object({
                name: z.string(), // Titre du post
                image: z.string(), // URL de l'image
                description: z.string(), // Description du post
            })
        )
        .mutation(async ({ input, ctx }) => {
            // Vérifie que l'utilisateur est connecté
            if (!ctx.session?.user?.id) {
                throw new Error("User non connecté.");
            }

            // Crée un nouveau post dans la base de données
            const post = await db.post.create({
                data: {
                    ...input,
                    createdById: ctx.session.user.id, // Associe le post à l'utilisateur connecté
                },
            });

            console.log('post créé avec succès !', post);
            return post; // Retourne le post créé
        }),

    // Route publique pour récupérer tous les posts
    getPosts: publicProcedure.query(async () => {
        return await db.post.findMany({
            orderBy: { createdAt: 'desc' }, // Trie les posts par date de création, du plus récent au plus ancien
            include: {
                User: true, // Inclut les informations de l'utilisateur associé au post
            },
        });
    }),

    // Route publique pour récupérer les posts d'un utilisateur spécifique
    getUserPosts: publicProcedure
    .input(
        z.object({
            userId: z.string(), // ID de l'utilisateur dont on souhaite récupérer les posts
        })
    )
    .query(async ({ input }) => {
        return await db.post.findMany({
            where: {
                createdById: input.userId, // Filtre les posts pour ceux créés par l'utilisateur spécifié
            },
            orderBy: { createdAt: 'desc' }, // Trie les posts par date de création, du plus récent au plus ancien
            include: {
                User: true, // Inclut les informations de l'utilisateur associé au post
            },
        });
    }),
});
