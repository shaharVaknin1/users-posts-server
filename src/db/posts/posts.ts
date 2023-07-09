import { Post } from "../../common/types";
import connection from "../connection";

import { insertPostTemplates, selectPostsTemplates, deletePostTemplates } from "./query-templates";

export const setPosts = async (posts: Post[]) => {
  const allInsets = posts.map(
    ({ id, userId, title, body }) =>
      new Promise((resolve, reject) => {
        connection.query(insertPostTemplates, [id, userId, title, body], (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      })
  );

  return Promise.all(allInsets);
};

export const getPosts = (userId, offset: number, limit: number): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.query(selectPostsTemplates, [userId, offset, limit], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: number) =>
  new Promise((resolve, reject) => {
    connection.query(deletePostTemplates, [postId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
