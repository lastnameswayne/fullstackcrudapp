import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { type } from "os";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>can't find the post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>{data.post.title}</Heading>
      <Box mb={4}>
        <Text>{data.post.text}</Text>
      </Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      ></EditDeletePostButtons>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
