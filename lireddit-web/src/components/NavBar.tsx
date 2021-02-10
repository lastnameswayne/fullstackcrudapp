import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}
export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  //data loading...
  if (fetching) {
    body = null;
    //user not logged in
  } else if (!data?.me) {
    body = (
      <Flex>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </Flex>
    );
    //user  logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Box ml="auto">
          <Link href="/">CRUD APP</Link>
        </Box>
        <Button
          ml="auto"
          color="white"
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Log out
        </Button>
      </Flex>
    );
  }
  return (
    <Box position="sticky" top={0} zIndex={1} bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Box>
  );
};
