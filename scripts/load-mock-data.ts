import * as fs from "node:fs/promises"
import path from "node:path";

import { Tigris } from "@tigrisdata/core";
import Post from "../src/db/models/post";
import User from "../src/db/models/user";

import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production")

const BATCH_SIZE = 200;

async function main(): Promise<void> {
  const mockFilesDir = path.join(__dirname, "..", "mock-data");

  const tigrisClient = new Tigris();
  const db = tigrisClient.getDatabase();

  console.log("Gettings users from Users collection");
  const usersCollection = db.getCollection<User>(User);
  const users = await usersCollection.findMany().toArray();
  if (users.length === 0) {
    console.error(`Please add one or more users to the database using
    "npm run add-users -- {username} {username} ... {username}"`);
    process.exit(1);
  }

  const mockFiles = (await fs.readdir(mockFilesDir)).filter(x => x.startsWith("socials"));
  const postCollection = tigrisClient.getDatabase().getCollection<Post>(Post);
  for (let i = 0; i < mockFiles.length; ++i) {
    console.log(`Reading mock file ${i + 1} of ${mockFiles.length}`);
    const json = await fs.readFile(path.join(mockFilesDir, mockFiles[i]), "utf-8");

    let posts: Post[] = JSON.parse(json);
    posts = posts.map((post) => {
      post.username = users[Math.floor(Math.random() * users.length)].username;
      return post;
    })

    const insertions: Array<Promise<Post[]>> = [];
    while (posts.length > 0) {
      const insert = posts.splice(0, BATCH_SIZE);
      insertions.push(postCollection.insertMany(insert));
    }
    await Promise.all(insertions);
  }
}

main()
  .then(async () => {
    console.log("Loading data complete ...");
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    console.error("Loading data failed.");
    process.exit(1);
  });