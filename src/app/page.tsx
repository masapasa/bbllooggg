"use client";

import { Spinner, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { PostForm } from "~/components/PostForm";
import { PostList } from "~/components/PostList";
import { WithPrivateRoute } from "~/components/withPrivateRoute";
import { api } from "~/utils/api";
import { supabase } from "~/utils/supabase-client";
import { useEvent } from "./hook/useEvents";

const Posts = () => {
    const { data, isLoading } = api.post.getPosts.useQuery();
    const utils = api.useContext();

    useEffect(() => {
        const newPostsChannel = supabase
            .channel("supabaseChangesChannel")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "posts",
                },
                (payload) => console.log(payload)
            )
            .subscribe(() => {
                void utils.post.getPosts.invalidate();
            });

        return () => {
            void newPostsChannel.unsubscribe();
        };
    }, [utils]);

    const logOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <>
            <Button
                onClick={() => void logOut()}
                size={"xs"}
                w={"100%"}
                my={8}
                variant={"link"}
            >
                Log Out
            </Button>
            <Text fontSize={"4xl"} align="center">
                Create a post
            </Text>
            <PostForm />

            {isLoading && <Spinner />}
            {data && <PostList posts={data} />}
        </>
    );
};

export default WithPrivateRoute(Posts);
