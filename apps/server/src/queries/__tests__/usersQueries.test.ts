/* eslint-disable jest/no-conditional-expect */
import {
  signUpQuery,
  getUserByUsernameQuery,
  getUserQuery,
  addBalanceQuery,
  removeBalanceQuery,
} from "../usersQueries";

import prisma from "../../util/prisma/client";

import { userMock } from "../../util/testing";

describe("users queries", () => {
  beforeEach(() => {
    prisma.user.create = jest.fn();
    prisma.user.findUnique = jest.fn();
    prisma.wallet.update = jest.fn();
  });

  it("should sign user up", async () => {
    jest.spyOn(prisma.user, "create").mockResolvedValue(userMock);

    const response = await signUpQuery(userMock.username, userMock.password);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: userMock.username,
        password: userMock.password,
        wallet: { create: { GBP: 1000, USD: 1000 } },
      },
      include: { wallet: true },
    });
    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.data.username).toBe(userMock.username);
    expect(response.data.password).toBe(userMock.password);
  });

  it("should get user by username", async () => {
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(userMock);

    const response = await getUserByUsernameQuery(userMock.username);

    if (response.data) {
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: userMock.username },
        include: { wallet: true },
      });
      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.id).toStrictEqual(userMock.id);
      expect(response.data.username).toBe(userMock.username);
    } else {
      throw new Error("response.data is missing");
    }
  });

  it("should fail to get user by username", async () => {
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const response = await getUserByUsernameQuery(userMock.username);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: userMock.username },
      include: { wallet: true },
    });
    expect(response.status.code).toBe(404);
    expect(response.status.ok).toBe(false);
    expect(response.data).toBe(undefined);
  });

  it("should get user by id", async () => {
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(userMock);

    const response = await getUserQuery(userMock.id);

    if (response.data) {
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userMock.id },
        include: { wallet: true },
      });
      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.id).toStrictEqual(userMock.id);
      expect(response.data.username).toBe(userMock.username);
    } else {
      throw new Error("response.data is missing");
    }
  });

  it("should fail to get user", async () => {
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

    const response = await getUserQuery(userMock.id);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userMock.id },
      include: { wallet: true },
    });
    expect(response.status.code).toBe(404);
    expect(response.status.ok).toBe(false);
    expect(response.data).toBe(undefined);
  });

  it("should add balance", async () => {
    const resolvedValues = {
      id: userMock.wallet.id,
      userID: userMock.id,
      USD: userMock.wallet.USD + 500,
      GBP: userMock.wallet.GBP,
      user: {
        id: userMock.id,
        username: userMock.username,
        password: userMock.password,
        createdAt: userMock.createdAt,
      },
    };

    jest.spyOn(prisma.wallet, "update").mockResolvedValue(resolvedValues);

    const response = await addBalanceQuery(userMock.id, "USD", 500);

    if (!response.data.wallet) throw new Error();

    expect(prisma.wallet.update).toHaveBeenCalledWith({
      where: { userID: userMock.id },
      data: { USD: { increment: 500 } },
      include: { user: true },
    });
    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.data.id).toStrictEqual(userMock.id);
    expect(response.data.wallet.USD).toBe(1500);
  });

  it("should remove balance", async () => {
    const resolvedValues = {
      id: userMock.wallet.id,
      userID: userMock.id,
      USD: userMock.wallet.USD - 500,
      GBP: userMock.wallet.GBP,
      user: {
        id: userMock.id,
        username: userMock.username,
        password: userMock.password,
        createdAt: userMock.createdAt,
      },
    };

    jest.spyOn(prisma.wallet, "update").mockResolvedValue(resolvedValues);

    const response = await removeBalanceQuery(userMock.id, "USD", 500);

    if (!response.data.wallet) throw new Error();

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.data.id).toStrictEqual(userMock.id);
    expect(response.data.wallet.USD).toBe(500);
  });
});
