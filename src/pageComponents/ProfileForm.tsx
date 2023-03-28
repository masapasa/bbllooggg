import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputControl, SubmitButton } from "chakra-ui-react-hook-form";
import { useForm } from "react-hook-form";
import { Stack, Text } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";

export const profileValidationSchema = Yup.object({
    username: Yup.string().required().min(3).max(280),
    userId: Yup.string().required(),
});

type ProfileFormValues = Yup.InferType<typeof profileValidationSchema>;

export const ProfileForm = () => {
    const userId = useUser().user?.id;
    const { mutate } = api.user.createProfile.useMutation();

    const { control, handleSubmit, formState } = useForm<ProfileFormValues>({
        defaultValues: { username: "", userId },
        resolver: yupResolver(profileValidationSchema),
    });

    console.log(formState);

    const onSubmit = (values: ProfileFormValues) => {
        console.log(values);
        mutate(values);
    };

    return (
        <Stack spacing={8}>
            <Text fontSize={"4xl"} align="center">
                Set up your profile
            </Text>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    void handleSubmit(onSubmit)(e);
                }}
            >
                <Stack spacing={4}>
                    <InputControl
                        control={control}
                        name="username"
                        label="username"
                        inputProps={{ placeholder: "Your username" }}
                    />

                    <SubmitButton control={control}>submit</SubmitButton>
                </Stack>
            </form>
        </Stack>
    );
};
