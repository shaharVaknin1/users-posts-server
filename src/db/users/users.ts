import connection from "../connection";

import { selectCountOfUsersTemplate, selectUsersTemplate } from "./query-templates";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.query(selectCountOfUsersTemplate, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results[0].count);
    });
  });

export const getUsers = (offset, limit): Promise<DBUser[]> =>
  new Promise((resolve, reject) => {
    connection.query(selectUsersTemplate, [offset, limit], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results as DBUser[]);
    });
  });
