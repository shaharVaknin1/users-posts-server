import connection from "../connection";

import { deletePostTemplate, insertPostTemplate, selectPostsTemplate } from "./query-templates";
import { deletePost, getPosts, setPosts } from "./posts";

jest.mock("../connection", () => ({
  query: jest.fn()
}));

describe("setPosts", () => {
  test("should insert posts into the database", async () => {
    const posts = [
      { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
      { id: 2, userId: 1, title: "Post 2", body: "Body 2" }
    ];

    const queryMock = jest.fn((_, values, callback) => {
      callback(null, values);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(setPosts(posts)).resolves.toEqual(
      posts.map(({ id, userId, title, body }) => [id, userId, title, body])
    );

    expect(queryMock).toHaveBeenCalledTimes(2);
    expect(queryMock.mock.calls[0][0]).toEqual(insertPostTemplate);
    expect(queryMock.mock.calls[0][1]).toEqual([1, 1, "Post 1", "Body 1"]);
    expect(queryMock.mock.calls[1][0]).toEqual(insertPostTemplate);
    expect(queryMock.mock.calls[1][1]).toEqual([2, 1, "Post 2", "Body 2"]);
  });

  test("should reject with an error if there is a database error", async () => {
    const posts = [
      { id: 1, userId: 1, title: "Post 1", body: "Body 1" },
      { id: 2, userId: 1, title: "Post 2", body: "Body 2" }
    ];
    const expectedError = new Error("Database error");

    const queryMock = jest.fn((_, values, callback) => {
      callback(expectedError);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(setPosts(posts)).rejects.toThrow(expectedError);
  });
});

describe("getPosts", () => {
  test("should retrieve posts from the database", async () => {
    const userId = 1;
    const offset = 0;
    const limit = 10;
    const expectedResults = [
      { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
      { userId: 1, id: 2, title: "Post 2", body: "Body 2" }
    ];

    const queryMock = jest.fn((_, values, callback) => {
      callback(null, expectedResults);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(getPosts(userId, offset, limit)).resolves.toEqual(expectedResults);

    expect(queryMock).toHaveBeenCalledTimes(1);

    expect(queryMock.mock.calls[0][0]).toEqual(selectPostsTemplate);
    expect(queryMock.mock.calls[0][1]).toEqual([userId, offset, limit]);
  });

  test("should reject with an error if there is a database error", async () => {
    const userId = 1;
    const offset = 0;
    const limit = 10;
    const expectedError = new Error("Database error");

    const queryMock = jest.fn((_, values, callback) => {
      callback(expectedError);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(getPosts(userId, offset, limit)).rejects.toThrow(expectedError);
  });
});

describe("deletePost", () => {
  test("should delete a post from the database", async () => {
    const postId = 1;

    const queryMock = jest.fn((_, values, callback) => {
      callback(null, values);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(deletePost(postId)).resolves.toEqual([postId]);

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toEqual(deletePostTemplate);
    expect(queryMock.mock.calls[0][1]).toEqual([postId]);
  });

  test("should reject with an error if there is a database error", async () => {
    const postId = 1;
    const expectedError = new Error("Database error");

    const queryMock = jest.fn((_, values, callback) => {
      callback(expectedError);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(deletePost(postId)).rejects.toThrow(expectedError);
  });
});
