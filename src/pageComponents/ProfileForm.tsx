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
import { useRouter } from "next/navigation";
import { supabase } from "~/utils/supabase-client";

export const profileValidationSchema = Yup.object({
  username: Yup.string().required().min(3).max(280),
});

type ProfileFormValues = Yup.InferType<typeof profileValidationSchema>;

const ProfileFormBase = () => {
  const router = useRouter();
  const userId = useUser().user?.id;
  const utils = api.useContext();
  const { mutateAsync, isLoading } = api.user.updateProfile.useMutation({
    onSuccess: async () => {
      await utils.user.getProfile.invalidate();
      void router.push("/");
    },
    onError: () => {
      openErrorToast();
    },
  });

  const toast = useToast();

  const openErrorToast = () => {
    toast({ title: "Error setting up profile", status: "error" });
  };

  const [openFileSelector, { filesContent, plainFiles, errors }] =
    useFilePicker({
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

    let url = null;

    const file = plainFiles[0];

    if (file) {
      const { error, url: signedURL } = await uploadFile(userId, file);

      if (error) {
        openErrorToast();
        return;
      }

      url = signedURL;
    }

    void mutateAsync({ ...values, avatar_url: url ?? undefined });
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

          <Button onClick={() => openFileSelector()}>Upload avatar</Button>

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

          <SubmitButton control={control} isLoading={isLoading}>
            submit
          </SubmitButton>
          {errors.length && (
            <Text color={"red.300"} align="center">
              Error occured, please choose different file.
            </Text>
          )}
        </Stack>
      </form>
    </Stack>
  );
};

export const ProfileForm = WithPrivateRoute(ProfileFormBase);
