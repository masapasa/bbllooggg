import {
    Stack,
    Text,
    Divider,
    Box,
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    Avatar,
    ModalFooter,
    Spacer,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { CommentForm } from "./CommentForm";

type PostsWithComments = RouterOutputs["post"]["getPosts"];
type Comments = RouterOutputs["post"]["getPosts"][number]["comments"][number];

export function PostList({ posts }: { posts: PostsWithComments }) {
    return (
        <Stack spacing={5}>
            {posts.map(
                ({ title, content, id, created_at, comments, profiles }) => (
                    <Box
                        padding={8}
                        border="1px"
                        borderColor="gray.700"
                        borderRadius={10}
                        key={id}
                    >
                        <Stack spacing={4}>
                            <Flex
                                justifyContent={"space-between"}
                                alignItems="center"
                            >
                                <Flex alignItems={"center"} mr={4} gap={2}>
                                    <Avatar
                                        name={profiles.username ?? "unknown"}
                                        src={profiles.avatar_url ?? ""}
                                    />
                                    <Text color={"gray.400"}>
                                        {profiles.username}
                                    </Text>
                                </Flex>
                                <Text fontWeight={"medium"} fontSize={"2xl"}>
                                    {title}
                                </Text>
                                <Spacer />
                                <Text
                                    fontStyle={"italic"}
                                    fontSize={"smaller"}
                                    color={"gray.500"}
                                >
                                    {formatDistance(created_at, new Date(), {
                                        addSuffix: true,
                                    })}
                                </Text>
                            </Flex>
                            <Text>{content}</Text>
                        </Stack>

                        <CommentList comments={comments} postId={id} />
                    </Box>
                )
            )}
        </Stack>
    );
}

const CommentList = ({
    comments,
    postId,
}: {
    comments: Comments[];
    postId: string;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleModalClose = () => {
        onClose();
    };

    return (
        <>
            <Stack spacing={4} my={4}>
                <Divider />
                {comments.map(
                    ({
                        content,
                        created_at,
                        id: commentId,
                        profiles,
                    }: Comments) => (
                        <Flex
                            justifyContent={"space-between"}
                            alignItems="center"
                            key={commentId}
                        >
                            <Flex alignItems={"center"} mr={4} gap={2}>
                                <Text color={"gray.400"}>
                                    {profiles.username}
                                </Text>
                            </Flex>
                            <Text>{content}</Text>
                            <Spacer />
                            <Text
                                fontStyle={"italic"}
                                fontSize={"smaller"}
                                color={"gray.500"}
                            >
                                {formatDistance(created_at, new Date(), {
                                    addSuffix: true,
                                })}
                            </Text>
                        </Flex>
                    )
                )}
            </Stack>

            <Button size={"sm"} variant={"solid"} w="100%" onClick={onOpen}>
                Add comment
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Comment the post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CommentForm
                            handleModalClose={handleModalClose}
                            postId={postId}
                        />
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
