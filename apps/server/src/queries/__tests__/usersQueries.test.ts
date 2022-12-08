/* eslint-disable jest/no-conditional-expect */
import {
  signUpQuery,
  getUserByUsernameQuery,
  getUserQuery,
  addBalanceQuery,
  removeBalanceQuery,
} from "../usersQueries";

import { connectMongoMemoryServer, disconnectDB } from "../../util/testing";

import { ObjectId } from "mongoose";

import bcrypt from "bcryptjs";

describe("users queries", () => {
  let userID: ObjectId | undefined = undefined;
  const username = "username-test";
  const password = "password-test";

  beforeAll(async () => {
    await connectMongoMemoryServer();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should sign user up", async () => {
    const hashed = await bcrypt.hash(password, 10);

    const response = await signUpQuery(username, hashed);

    userID = response.data._id;

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.data.username).toBe(username);
    expect(response.data.password).toBe(hashed);
  });

  it("should get user by username", async () => {
    const response = await getUserByUsernameQuery(username);

    if (response.data) {
      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data._id).toStrictEqual(userID);
      expect(response.data.username).toBe(username);
    } else {
      throw new Error("response.data is missing");
    }
  });

  it("should get user", async () => {
    if (!userID) {
      throw new Error("userID is empty");
    }

    const response = await getUserQuery(userID);

    if (response.data) {
      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data._id).toStrictEqual(userID);
      expect(response.data.username).toBe(username);
    } else {
      throw new Error("response.data is missing");
    }
  });

  it("should add balance", async () => {
    if (!userID) {
      throw new Error("userID is empty");
    }

    const response = await addBalanceQuery(userID, "USD", 500);

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.data._id).toStrictEqual(userID);
    expect(response.data.wallet.USD).toBe(1500);
  });

  it("should remove balance", async () => {
    if (!userID) {
      throw new Error("userID is empty");
    }

    const response = await removeBalanceQuery(userID, "USD", 500);

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.data._id).toStrictEqual(userID);
    expect(response.data.wallet.USD).toBe(1000);
  });
});
