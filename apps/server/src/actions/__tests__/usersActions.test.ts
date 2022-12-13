/* eslint-disable jest/no-conditional-expect */
import {
  signUpAction,
  signInAction,
  getUserAction,
  addBalanceAction,
  removeBalanceAction,
} from "../usersActions";

import { userMock } from "../../util/testing";

import bcrypt from "bcryptjs";

import APIError from "../../util/errors/APIError";

import { TCurrencies } from "interfaces-common";

import {
  signUpQuery,
  getUserByUsernameQuery,
  getUserQuery,
  addBalanceQuery,
  removeBalanceQuery,
} from "../../queries/usersQueries";

jest.mock("../../queries/usersQueries", () => {
  return {
    signUpQuery: jest.fn(),
    getUserByUsernameQuery: jest.fn(),
    getUserQuery: jest.fn(),
    addBalanceQuery: jest.fn(),
    removeBalanceQuery: jest.fn(),
  };
});

const signUpQueryMocked = jest.mocked(signUpQuery);
const getUserByUsernameQueryMocked = jest.mocked(getUserByUsernameQuery);
const getUserQueryMocked = jest.mocked(getUserQuery);
const addBalanceQueryMocked = jest.mocked(addBalanceQuery);
const removeBalanceQueryMocked = jest.mocked(removeBalanceQuery);

describe("users actions", () => {
  it("should sign up user", async () => {
    getUserByUsernameQueryMocked.mockImplementation(async () => {
      return { status: { code: 404, ok: false }, data: undefined };
    });

    signUpQueryMocked.mockImplementation(async (username: string, password: string) => {
      return {
        status: { code: 201, ok: true },
        data: { ...userMock, username, password },
      };
    });

    const response = await signUpAction(userMock.username, userMock.password);

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.username).toBe(userMock.username);
    expect(response.success.doc.password).not.toBe(userMock.password);
    expect(typeof response.success.token).toBe("string");
  });

  it("should fail because username already exists", async () => {
    getUserByUsernameQueryMocked.mockImplementation(async () => {
      return { status: { code: 200, ok: true }, data: userMock };
    });

    try {
      await signUpAction(userMock.username, userMock.password);
    } catch (error) {
      expect(error).toStrictEqual(APIError.conflict());
    }
  });

  it("should sign in user", async () => {
    getUserByUsernameQueryMocked.mockImplementation(async () => {
      const hashed = await bcrypt.hash(userMock.password, 10);

      return {
        status: { code: 200, ok: true },
        data: { ...userMock, password: hashed },
      };
    });

    const response = await signInAction(userMock.username, userMock.password);

    expect(response.status.code).toBe(200);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.username).toBe(userMock.username);
    expect(response.success.doc.password).not.toBe(userMock.password);
    expect(typeof response.success.token).toBe("string");
  });

  it("should fail to sign in user with wrong password", async () => {
    getUserByUsernameQueryMocked.mockImplementation(async () => {
      return {
        status: { code: 200, ok: true },
        data: userMock,
      };
    });

    try {
      await signInAction(userMock.username, userMock.password);
    } catch (error) {
      expect(error).toStrictEqual(APIError.unauthorizedRequest());
    }
  });

  it("should get user", async () => {
    getUserQueryMocked.mockImplementation(async () => {
      return {
        status: { code: 200, ok: true },
        data: userMock,
      };
    });

    const response = await getUserAction(userMock.id);

    expect(response.status.code).toBe(200);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.id).toStrictEqual(userMock.id);
    expect(response.success.doc.username).toBe(userMock.username);
    expect(response.success.doc.password).toBe(userMock.password);
    expect(typeof response.success.token).toBe("string");
  });

  it("should fail to get user with code 404", async () => {
    getUserQueryMocked.mockImplementation(async () => {
      return {
        status: { code: 404, ok: true },
        data: userMock,
      };
    });

    try {
      await getUserAction(userMock.id);
    } catch (error) {
      expect(error).toStrictEqual(APIError.notFound());
    }
  });

  it("should fail to get user with code empty data", async () => {
    getUserQueryMocked.mockImplementation(async () => {
      return {
        status: { code: 200, ok: true },
        data: undefined,
      };
    });

    try {
      await getUserAction(userMock.id);
    } catch (error) {
      expect(error).toStrictEqual(APIError.notFound());
    }
  });

  it("should add balance", async () => {
    addBalanceQueryMocked.mockImplementation(
      async (userID: string, currency: TCurrencies, amount: number) => {
        if (!userMock.wallet) throw new Error();

        return {
          status: { code: 201, ok: true },
          data: {
            ...userMock,
            wallet: {
              ...userMock.wallet,
              [currency]: userMock.wallet[currency] + amount,
            },
          },
        };
      },
    );

    const response = await addBalanceAction(userMock.id, "GBP", 500);

    if (!response.success.doc.wallet) throw new Error();

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.id).toStrictEqual(userMock.id);
    expect(response.success.doc.wallet.GBP).toBe(1500);
  });

  it("should remove balance", async () => {
    removeBalanceQueryMocked.mockImplementation(
      async (userID: string, currency: TCurrencies, amount: number) => {
        if (!userMock.wallet) throw new Error();

        return {
          status: { code: 201, ok: true },
          data: {
            ...userMock,
            wallet: {
              ...userMock.wallet,
              [currency]: userMock.wallet[currency] - amount,
            },
          },
        };
      },
    );

    const response = await removeBalanceAction(userMock.id, "GBP", 500);

    if (!response.success.doc.wallet) throw new Error();

    expect(response.status.code).toBe(201);
    expect(response.status.ok).toBe(true);
    expect(response.success.doc.id).toStrictEqual(userMock.id);
    expect(response.success.doc.wallet.GBP).toBe(500);
  });
});
