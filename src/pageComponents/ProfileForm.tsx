import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputControl, SubmitButton } from "chakra-ui-react-hook-form";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { useFilePicker } from "use-file-picker";
import Image from "next/image";
import { WithPrivateRoute } from "~/components/withPrivateRoute";
import { uploadFile } from "~/server/api/utils";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { redirect } from "next/navigation";

export const profileValidationSchema = Yup.object({
    username: Yup.string().required().min(3).max(280),
});

type ProfileFormValues = Yup.InferType<typeof profileValidationSchema>;

const ProfileFormBase = () => {
    const userId = useUser().user?.id;
    const { mutateAsync } = api.user.updateProfile.useMutation({
        onSuccess: () => {
            redirect("/");
        },
        onError: () => {
            openErrorToast();

            // TODO: dodaj on Success i on Error i on Submit close w comment modalu
        },
    });

    const toast = useToast();

    const openErrorToast = () => {
        toast({ title: "Error setting up profile", status: "error" });
    };

    const defaultImage = {
        lastModified: new Date().getTime(),
        name: "blankImage",
        content:
            "https://storage.needpix.com/thumbs/blank-profile-picture-973460_1280.png",
    };

    const [openFileSelector, { filesContent, errors }] = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 50,
        imageSizeRestrictions: {
            maxHeight: 1000,
            maxWidth: 1000,
            minHeight: 200,
            minWidth: 200,
        },
    });

    const { control, handleSubmit } = useForm<ProfileFormValues>({
        defaultValues: {
            username: "",
        },
        resolver: yupResolver(profileValidationSchema),
    });

    console.log("errors", errors);

    const onSubmit = async (values: ProfileFormValues) => {
        if (!userId) {
            openErrorToast();
            return;
        }

        const { error, url } = await uploadFile(
            userId,
            filesContent[0]?.content ?? defaultImage.content
        );

        if (error) {
            openErrorToast();
            return;
        }

        void mutateAsync({ ...values, avatar_url: url });
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
                        inputProps={{ placeholder: "username" }}
                    />

                    <Button onClick={() => openFileSelector()}>
                        Upload avatar
                    </Button>

                    {filesContent.map((file, index) => (
                        <Stack
                            key={index}
                            w={"100%"}
                            border={"1px"}
                            borderRadius="8"
                            padding={4}
                            alignItems="center"
                            justifyContent={"center"}
                            spacing={4}
                            borderColor="gray.600"
                        >
                            <Text>choosed: {file.name}</Text>
                            <Image
                                alt={file.name}
                                src={file.content}
                                width={400}
                                height={400}
                            />
                            <br />
                        </Stack>
                    ))}

                    <SubmitButton control={control}>submit</SubmitButton>
                </Stack>
            </form>
        </Stack>
    );
};

export const ProfileForm = WithPrivateRoute(ProfileFormBase);
