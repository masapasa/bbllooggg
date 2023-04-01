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

    // useEffect(() => {
    //     supabase
    //         .channel("public:posts")
    //         .on(
    //             "postgres_changes",
    //             {
    //                 schema: "public",
    //                 table: "posts",
    //                 event: "*",
    //             },
    //             (payload) => {
    //                 console.log(payload.new);
    //                 void utils.post.getPosts.invalidate();
    //             }
    //         )
    //         .subscribe((status) => console.log(status));

    //     supabase
    //         .channel("any")
    //         .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
    //             console.log("Change received!", payload);
    //             void utils.post.getPosts.invalidate();
    //         })
    //         .subscribe();

    //     return () => {
    //         void supabase.channel("public:posts").unsubscribe();
    //     };
    // }, [utils]);

    const channel = supabase
        .channel("any")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
            },
            (payload) => {
                console.log(payload);
                void utils.post.getPosts.invalidate();
            }
        )
        .subscribe();

    console.log(supabase.getChannels());

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
