import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db"; // Assure-toi que le client Prisma est bien importé

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
            console.log('le ctx ressemble a ca : ', ctx.session)
            console.log('le input ressemble a ca : ', input)

            if (!ctx.session?.user?.id) {
                throw new Error("User not authenticated or user ID is undefined.");
            }

            const post = await db.post.create({
                data: {
                    ...input,
                    createdById: ctx.session?.user?.id,
                },
            });
            return post;
        }),
});