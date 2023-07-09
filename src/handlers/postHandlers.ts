import { fetchPosts } from "../api/posts/posts";
import { getPosts, setPosts } from "../db/posts/posts";

export const getPostsAndCacheIfNeeded = async (offset, limit, userId) => {
  let posts = await getPosts(userId, offset, limit);
  if (!Array.isArray(posts)) throw new Error("posts is not an array");

  if (posts.length === 0) {
    posts = await fetchPosts(userId);
    await setPosts(posts);
    posts = posts.slice(offset, offset + limit);
  }

  return posts;
};
