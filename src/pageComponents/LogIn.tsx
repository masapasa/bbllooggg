import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

import { supabase } from "~/utils/supabase-client";

export function LogIn() {
    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        console.log(data);
        console.log(error);
    }

    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
            <Stack spacing={5} justifyContent="center">
                <Text fontSize={"3xl"} align="center" w={450}>
                    Log in with Google
                </Text>
                <Button
                    colorScheme="red"
                    onClick={() => void signInWithGoogle()}
                >
                    Google
                </Button>
            </Stack>
        </Flex>
    );
}
