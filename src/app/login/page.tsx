"use client";

import { Button, Text } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import React from "react";

const supabase = createClient(
    "https://dkgqaqbyzemllerimgav.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ3FhcWJ5emVtbGxlcmltZ2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3NjMzNTIsImV4cCI6MTk5NTMzOTM1Mn0.iJYNSkVLErUQVrXxegtCuxQ3rp-1RyEpUV9Cr3HuZN0"
);

function LogIn() {
    async function signInWithGitHub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
        });

        console.log(data);
    }

    return (
        <>
            <Text size={"6xl"}>Log in with Github</Text>
            <Button colorScheme="red" onClick={() => void signInWithGitHub()}>
                Github
            </Button>
        </>
    );
}

export default LogIn;
