import connection from "../connection";

import { selectCountOfUsersTemplate, selectUsersTemplate } from "./query-templates";
import { getUsersCount, getUsers } from "./users";

jest.mock("../connection", () => ({
  query: jest.fn()
}));

describe("getUsersCount", () => {
  test("should retrieve the count of users from the database", async () => {
    const expectedCount = 10;

    const queryMock = jest.fn((_, callback) => {
      callback(null, [{ count: expectedCount }]);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(getUsersCount()).resolves.toEqual(expectedCount);

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toEqual(selectCountOfUsersTemplate);
  });

  test("should reject with an error if there is a database error", async () => {
    const expectedError = new Error("Database error");

    const queryMock = jest.fn((_, callback) => {
      callback(expectedError);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(getUsersCount()).rejects.toThrow(expectedError);
  });
});

describe("getUsers", () => {
  test("should retrieve users from the database with the given offset and limit", async () => {
    const offset = 0;
    const limit = 10;
    const expectedResults = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" }
    ];

    const queryMock = jest.fn((_, values, callback) => {
      callback(null, expectedResults);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(getUsers(offset, limit)).resolves.toEqual(expectedResults);

    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0][0]).toEqual(selectUsersTemplate);
    expect(queryMock.mock.calls[0][1]).toEqual([offset, limit]);
  });

  test("should reject with an error if there is a database error", async () => {
    const offset = 0;
    const limit = 10;
    const expectedError = new Error("Database error");

    const queryMock = jest.fn((_, values, callback) => {
      callback(expectedError);
    });
    (connection.query as jest.Mock).mockImplementation(queryMock);

    await expect(getUsers(offset, limit)).rejects.toThrow(expectedError);
  });
});
