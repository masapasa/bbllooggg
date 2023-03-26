import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    InputControl,
    SubmitButton,
    TextareaControl,
} from "chakra-ui-react-hook-form";
import { useForm } from "react-hook-form";
import { Divider, Stack, Text } from "@chakra-ui/react";
import { api } from "../utils/api";

export const postValidationSchema = Yup.object({
    title: Yup.string().required().min(3).max(100),
    content: Yup.string().required().max(280),
});

type PostFormValues = Yup.InferType<typeof postValidationSchema>;

export const PostForm = () => {
    const { mutate } = api.post.createPost.useMutation();

    const { data } = api.post.getPosts.useQuery();

    console.log(data);

    const { control, handleSubmit } = useForm<PostFormValues>({
        defaultValues: {
            title: "",
            content: "",
        },
        resolver: yupResolver(postValidationSchema),
    });

    const onSubmit = (values: PostFormValues) => {
        console.log(values);
        mutate(values);
    };

    return (
        <>
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
                        label="content"
                        textareaProps={{ placeholder: "How was your day?" }}
                    />

                    <SubmitButton control={control}>submit</SubmitButton>
                </Stack>
            </form>

            {data &&
                data.map(({ title, content }) => (
                    <>
                        <Text>{title}</Text>
                        <Text>{content}</Text>
                        <Divider />
                    </>
                ))}
        </>
    );
};
