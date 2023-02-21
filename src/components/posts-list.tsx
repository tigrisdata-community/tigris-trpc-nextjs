import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import PostCard from "~/components/post-card";
import type Post from "~/db/models/post";

export default function PostsList({ posts }: { posts: Post[] }): JSX.Element {
  return (
    <Box id="posts">
      <Stack spacing={2}>
        {posts.length === 0 && <Typography>No posts yet!</Typography>}
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                username={post.username}
                text={post.text}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                createdAt={post.createdAt!}
              />
            );
          })}
      </Stack>
    </Box>
  );
}
