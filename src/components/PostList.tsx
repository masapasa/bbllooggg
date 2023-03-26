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
    ModalFooter,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { CommentForm } from "./CommentForm";

type PostsWithComments = RouterOutputs["post"]["getPosts"];
type Comments = RouterOutputs["post"]["getPosts"][number]["comments"][number];

export function PostList({ posts }: { posts: PostsWithComments }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack spacing={5}>
            {posts.map(({ title, content, id, created_at, comments }) => (
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
                            <Text fontWeight={"medium"} fontSize={"2xl"}>
                                {title}
                            </Text>
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

                    <Stack spacing={4} my={4}>
                        <Divider />
                        {comments.map(
                            ({ content, created_at, id }: Comments) => (
                                <Flex
                                    justifyContent={"space-between"}
                                    alignItems="center"
                                    key={id}
                                >
                                    <Text>{content}</Text>
                                    <Text
                                        fontStyle={"italic"}
                                        fontSize={"smaller"}
                                        color={"gray.500"}
                                    >
                                        {formatDistance(
                                            created_at,
                                            new Date(),
                                            { addSuffix: true }
                                        )}
                                    </Text>
                                </Flex>
                            )
                        )}
                    </Stack>

                    <Button
                        size={"sm"}
                        variant={"solid"}
                        w="100%"
                        onClick={onOpen}
                    >
                        Add comment
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Comment the post</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <CommentForm postId={id} />
                            </ModalBody>

                            <ModalFooter></ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            ))}
        </Stack>
    );
}
