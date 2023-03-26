import { z } from "zod";
import { postValidationSchema } from "~/components/PostForm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),
    createPost: publicProcedure
        .input(postValidationSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.posts.create({
                data: {
                    title: input.title,
                    content: input.content,
                },
            });
        }),
    getPosts: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.posts.findMany();
    }),
});
