export const insertPostTemplate = `
INSERT INTO posts (id, userId, title, body)
VALUES (?, ?, ?, ?)
`;

export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE userId = ?
LIMIT ?, ?
`;

export const deletePostTemplate = `
DELETE FROM posts
WHERE id = ?
`;
