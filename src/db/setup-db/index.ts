import { createPostsTable } from "./setup-posts";
import { createUsersTableAndInsertData } from "./setup-users";

export const setupDb = async () => {
  await createUsersTableAndInsertData();
  await createPostsTable();
};
