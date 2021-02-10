import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
} from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
            if (post.voteStatus === 1) {
                return;
            }
          await vote({ postId: post.id, value: 1 });
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        aria-label="upvote"
        icon={<TriangleUpIcon />}
      />
      <Text>{post.points}</Text>
      <IconButton
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        onClick={async() => {
            if (post.voteStatus === -1) {
                return;
            }
            await vote({ postId: post.id, value: -1 });
        }}
        aria-label="downvote"
        icon={<TriangleDownIcon />}
      />{" "}
    </Flex>
  );
};
