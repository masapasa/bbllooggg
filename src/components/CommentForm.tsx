import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    InputControl,
    SubmitButton,
    TextareaControl,
} from "chakra-ui-react-hook-form";
import { useForm } from "react-hook-form";
import { Stack } from "@chakra-ui/react";
import { api } from "../utils/api";

export const commentValidationSchema = Yup.object({
    content: Yup.string().required().max(280),
    postId: Yup.string().required(),
});

type CommentFormValues = Yup.InferType<typeof commentValidationSchema>;

export const CommentForm = ({ postId }: { postId: string }) => {
    const { mutate } = api.post.createComment.useMutation();

    const { control, handleSubmit } = useForm<CommentFormValues>({
        defaultValues: { content: "", postId },
        resolver: yupResolver(commentValidationSchema),
    });

    const onSubmit = (values: CommentFormValues) => {
        mutate(values);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(onSubmit)(e);
            }}
        >
            <Stack spacing={4}>
                <TextareaControl
                    control={control}
                    name="content"
                    textareaProps={{ placeholder: "Your comment" }}
                />

                <SubmitButton control={control}>submit</SubmitButton>
            </Stack>
        </form>
    );
};
