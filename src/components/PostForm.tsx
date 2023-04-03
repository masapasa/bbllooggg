import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    InputControl,
    SubmitButton,
    TextareaControl,
} from "chakra-ui-react-hook-form";
import { useForm } from "react-hook-form";
import { Spacer, Stack, useToast } from "@chakra-ui/react";
import { api } from "../utils/api";
import { supabase } from "~/utils/supabase-client";

export const postValidationSchema = Yup.object({
    title: Yup.string().required().min(3).max(100),
    content: Yup.string().required().max(280),
});

type PostFormValues = Yup.InferType<typeof postValidationSchema>;

export const PostForm = () => {
    const toast = useToast();
    const utils = api.useContext();
    const { mutateAsync, isLoading } = api.post.createPost.useMutation({
        onSuccess: () => {
            void utils.post.getPosts.invalidate();
        },
        onError: () => {
            toast({
                title: "Error adding post",
                status: "error",
            });
        },
    });

    const { control, handleSubmit } = useForm<PostFormValues>({
        defaultValues: {
            title: "",
            content: "",
        },
        resolver: yupResolver(postValidationSchema),
    });

    const onSubmit = (values: PostFormValues) => {
        void mutateAsync(values);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
            }}
        >
            <Stack spacing={4}>
                <InputControl
                    control={control}
                    name="title"
                    label="Post title"
                    inputProps={{ placeholder: "post title" }}
                />
                <TextareaControl
                    control={control}
                    name="content"
                    label="Content"
                    textareaProps={{ placeholder: "How was your day?" }}
                />

                <SubmitButton control={control} isLoading={isLoading}>
                    submit
                </SubmitButton>
                <Spacer />
            </Stack>
        </form>
    );
};
