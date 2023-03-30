import { z } from "zod";
import { commentValidationSchema } from "~/components/CommentForm";
import { postValidationSchema } from "~/components/PostForm";

import {
    createTRPCRouter,
    privateProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    createPost: privateProcedure
        .input(postValidationSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.posts.create({
                data: {
                    title: input.title,
                    content: input.content,
                    author_id: ctx.user.id,
                },
            });
        }),
    getPosts: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.posts.findMany({
            include: {
                profiles: {
                    select: {
                        avatar_url: true,
                        username: true,
                    },
                },
                comments: {
                    orderBy: {
                        created_at: "desc",
                    },
                    include: {
                        profiles: {
                            select: {
                                avatar_url: true,
                                username: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }),
    createComment: privateProcedure
        .input(commentValidationSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.comments.create({
                data: {
                    content: input.content,
                    post_id: input.postId,
                    author_id: ctx.user.id,
                },
            });
        }),
});
