import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.db.user.findFirst({
            where: {
                id: input,
            },
        });
    }),
});