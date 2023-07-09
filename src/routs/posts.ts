import { Router, Request, Response } from "express";

import { deletePost } from "../db/posts/posts";
import { getPostsAndCacheIfNeeded } from "../handlers/post-handlers";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 1000;
  const userId = Number(req.query.userId);
  const posts = await getPostsAndCacheIfNeeded(offset, limit, userId);
  res.send(posts);
});

router.delete("/", async (req: Request, res: Response) => {
  const postId = Number(req.query.postId);
  await deletePost(postId);
  res.send({ message: `Post with id ${postId} was deleted` });
});

export default router;
