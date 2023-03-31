import * as Yup from "yup";
import { profileValidationSchema } from "~/pageComponents/ProfileForm";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getProfile: privateProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.profiles.findUnique({
            where: {
                id: ctx.user.id,
            },
        });
    }),
    updateProfile: privateProcedure
        .input(
            profileValidationSchema.concat(
                Yup.object({
                    avatar_url: Yup.string(),
                })
            )
        )
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.profiles.update({
                data: {
                    username: input.username,
                    avatar_url: input.avatar_url,
                },
                where: {
                    id: ctx.user.id,
                },
            });
        }),
});
