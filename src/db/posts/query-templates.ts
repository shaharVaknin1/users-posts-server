export const insertPostTemplates = `
INSERT INTO posts (id, userId, title, body)
VALUES (?, ?, ?, ?)
`;

export const selectPostsTemplates = `
SELECT *
FROM posts
WHERE userId = ?
LIMIT ?, ?
`;

export const deletePostTemplates = `
DELETE FROM posts
WHERE id = ?
`;
