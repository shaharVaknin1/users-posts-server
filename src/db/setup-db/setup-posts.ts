import connection from "../connection";

export const createPostsTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE IF NOT EXISTS posts (
        id INT PRIMARY KEY,
        userId INT,
        title VARCHAR(255),
        body TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    );`;

    connection.query(sql, error => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
