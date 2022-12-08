import {
  signUpAction,
  signInAction,
  getUserAction,
  addBalanceAction,
  removeBalanceAction,
} from "../usersActions";

import { connectMongoMemoryServer, disconnectDB } from "../../util/testing";

import { ObjectId } from "mongoose";

describe("users actions", () => {
  let userID: ObjectId | undefined = undefined;
  const username = "username-test";
  const password = "password-test";

  beforeAll(async () => {
    await connectMongoMemoryServer();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should sign up user", async () => {
    const response = await signUpAction(username, password);

    userID = response.success.doc._id;

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.username).toBe(username);
    expect(response.success.doc.password).not.toBe(password);
    expect(typeof response.success.token).toBe("string");
  });

  it("should sign in user", async () => {
    const response = await signInAction(username, password);

    expect(response.status.code).toBe(200);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.username).toBe(username);
    expect(response.success.doc.password).not.toBe(password);
    expect(typeof response.success.token).toBe("string");
  });

  it("should get user", async () => {
    if (!userID) {
      throw new Error("userID is empty");
    }

    const response = await getUserAction(userID);

    expect(response.status.code).toBe(200);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc._id).toStrictEqual(userID);
    expect(response.success.doc.username).toBe(username);
    expect(response.success.doc.password).not.toBe(password);
    expect(typeof response.success.token).toBe("string");
  });

  it("should add balance", async () => {
    if (!userID) {
      throw new Error("userID is empty");
    }

    const response = await addBalanceAction(userID, "GBP", 500);

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc._id).toStrictEqual(userID);
    expect(response.success.doc.wallet.GBP).toBe(1500);
  });

  it("should remove balance", async () => {
    if (!userID) {
      throw new Error("userID is empty");
    }

    const response = await removeBalanceAction(userID, "GBP", 500);

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc._id).toStrictEqual(userID);
    expect(response.success.doc.wallet.GBP).toBe(1000);
  });
});
