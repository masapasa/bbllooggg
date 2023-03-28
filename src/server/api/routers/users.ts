import { z } from "zod";
import { profileValidationSchema } from "~/pageComponents/ProfileForm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),
    createProfile: publicProcedure
        .input(profileValidationSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.profiles.create({
                data: {
                    id: input.userId,
                    username: input.username,
                },
            });
        }),
});
