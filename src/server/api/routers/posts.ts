import { z } from "zod";
import { commentValidationSchema } from "~/components/CommentForm";
import { postValidationSchema } from "~/components/PostForm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
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
        return await ctx.prisma.posts.findMany({
            include: {
                comments: {
                    orderBy: {
                        created_at: "desc",
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }),
    createComment: publicProcedure
        .input(commentValidationSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.comments.create({
                data: {
                    content: input.content,
                    post_id: input.postId,
                },
            });
        }),
});
