import { Spinner, Text } from "@chakra-ui/react";
import { PostForm } from "~/components/PostForm";
import { PostList } from "~/components/PostList";
import { api } from "~/utils/api";

export const Posts = () => {
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
