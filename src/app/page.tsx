"use client";

import { Spinner, Text, Button } from "@chakra-ui/react";
import { PostForm } from "~/components/PostForm";
import { PostList } from "~/components/PostList";
import { WithPrivateRoute } from "~/components/withPrivateRoute";
import { api } from "~/utils/api";
import { supabase } from "~/utils/supabase-client";

const Posts = () => {
    const { data, isLoading } = api.post.getPosts.useQuery();

    console.log(data);

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
