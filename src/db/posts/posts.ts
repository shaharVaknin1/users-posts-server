import { Post } from "../../common/types";
import connection from "../connection";

import { insertPostTemplate, selectPostsTemplate, deletePostTemplate } from "./query-templates";

export const setPosts = async (posts: Post[]) => {
  const allInsets = posts.map(
    ({ id, userId, title, body }) =>
      new Promise((resolve, reject) => {
        connection.query(insertPostTemplate, [id, userId, title, body], (error, results) => {
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
    connection.query(selectPostsTemplate, [userId, offset, limit], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: number) =>
  new Promise((resolve, reject) => {
    connection.query(deletePostTemplate, [postId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
