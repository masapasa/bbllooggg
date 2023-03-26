"use client";

import { Text } from "@chakra-ui/react";
import { PostForm } from "~/components/PostForm";

const createPost = () => {
    return (
        <>
            <Text fontSize={"4xl"}>Create a post</Text>
            <PostForm />
        </>
    );
};

export default createPost;
