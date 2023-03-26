"use client";

import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import React from "react";

import { supabase } from "../layout";

function LogIn() {
    async function signInWithGitHub() {
        const { data } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "http://localhost:3000/login/set-username",
            },
        });

        console.log(data);
    }

    return (
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
            <Stack spacing={5} justifyContent="center">
                <Text fontSize={"3xl"} align="center" w={450}>
                    Log in with Github
                </Text>
                <Button
                    colorScheme="blue"
                    onClick={() => void signInWithGitHub()}
                >
                    Github
                </Button>
            </Stack>
        </Flex>
    );
}

export default LogIn;
