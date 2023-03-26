"use client";

import { Spinner, Text } from "@chakra-ui/react";
import { PostForm } from "~/components/PostForm";
import { PostList } from "~/components/PostList";
import { WithPrivateRoute } from "~/components/withPrivateRoute";
import { api } from "~/utils/api";

const Posts = () => {
    const { data, isLoading } = api.post.getPosts.useQuery();

    return (
        <>
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
