import {
  Box,
  Button,
  Container,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Layout } from "~/components/layout";
import PostsList from "~/components/posts-list";

import Post from "~/db/models/post";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const user = trpc.getUser.useQuery();
  const queryPosts = trpc.getMessages.useQuery();
  const submitMessageMutation = trpc.post.useMutation();

  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(queryPosts.data as Post[]);
  }, queryPosts.data);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    const post: Post = (await submitMessageMutation.mutateAsync({
      name: user.data!.name,
      text: message,
    })) as Post;

    setPosts((prev: Post[]) => {
      return [post, ...prev];
    });
    setMessage("");
    setSubmitting(false);

    return false;
  };

  if (!user.data || !posts) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Layout user={user.data}>
      <Typography variant="h4" component="h2">
        Welcome, {user.data?.name}
      </Typography>

      <Box id="middle" sx={{ padding: 0, mt: 5, mb: 5 }}>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            readOnly={submitting}
            value={message}
            style={styles.textArea as React.CSSProperties}
            required={true}
            placeholder="What's on your mind?"
          ></TextareaAutosize>
          <Box
            id="actions"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              type="submit"
              value="Post"
              disabled={submitting}
            >
              Post
            </Button>
          </Box>
        </form>
      </Box>

      <PostsList posts={posts} />
    </Layout>
  );
}

const fontFamily =
  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color emoji";
const styles = {
  textArea: {
    fontFamily: fontFamily,
    width: "100%",
    height: 18 * 5,
    fontSize: "16px",
    lineHeight: "18px",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    overflow: "auto",
    outline: "none",
    boxShadow: "none",
    resize: "none",
  },
};
