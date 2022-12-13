/* eslint-disable jest/no-conditional-expect */
import request from "supertest";

import app from "../../app";

import APIError from "../../util/errors/APIError";

import signJwt from "../../util/signJwt";

import { userMock, userServerResponseMock } from "../../util/testing";

import { signUpAction, signInAction, getUserAction } from "../../actions/usersActions";

jest.mock("../../actions/usersActions", () => {
  const original = jest.requireActual("../../actions/usersActions");
  return {
    ...original,
    signUpAction: jest.fn(),
    signInAction: jest.fn(),
    getUserAction: jest.fn(),
  };
});

const signUpActionMocked = jest.mocked(signUpAction);
const signInActionMocked = jest.mocked(signInAction);
const getUserActionMocked = jest.mocked(getUserAction);

describe("users", () => {
  describe("sign up routes", () => {
    it("should sign up user", async () => {
      signUpActionMocked.mockImplementation(async () => {
        return {
          status: { code: 201, ok: true },
          success: userServerResponseMock,
        };
      });

      const response = await request(app)
        .post("/v1/users/signup")
        .send({ username: userMock.username, password: userMock.password });

      expect(response.statusCode).toBe(201);
      expect(response.body.status.code).toBe(201);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userMock.username);
      expect(response.body.success.doc.wallet.USD).toBe(1000);
      expect(response.body.success.doc.wallet.GBP).toBe(1000);
      expect(typeof response.body.success.token).toBe("string");
    });

    it("should fail sign up user with missing password", async () => {
      signUpActionMocked.mockImplementation();

      try {
        await request(app).post("/v1/users/signup").send({ username: userMock.username });
      } catch (error) {
        expect(error).toStrictEqual(APIError.badRequest());
      }
    });

    it("should fail sign up user with missing username", async () => {
      signUpActionMocked.mockImplementation();

      try {
        await request(app).post("/v1/users/signup").send({ password: userMock.password });
      } catch (error) {
        expect(error).toStrictEqual(APIError.badRequest());
      }
    });
  });

  describe("sign in", () => {
    it("should sign in the user", async () => {
      signInActionMocked.mockImplementation(async () => {
        return {
          status: { code: 200, ok: true },
          success: userServerResponseMock,
        };
      });

      const response = await request(app)
        .post("/v1/users/signin")
        .send({ username: userMock.username, password: userMock.password });

      expect(response.statusCode).toBe(200);
      expect(response.body.status.code).toBe(200);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userMock.username);
      expect(typeof response.body.success.token).toBe("string");
    });

    it("should fail sign in user with missing password", async () => {
      signInActionMocked.mockImplementation();

      try {
        await request(app).post("/v1/users/signin").send({ username: userMock.username });
      } catch (error) {
        expect(error).toStrictEqual(APIError.badRequest());
      }
    });

    it("should fail sign in user with missing username", async () => {
      signInActionMocked.mockImplementation();

      try {
        await request(app).post("/v1/users/signin").send({ password: userMock.password });
      } catch (error) {
        expect(error).toStrictEqual(APIError.badRequest());
      }
    });
  });

  describe("get user", () => {
    it("should get the user", async () => {
      getUserActionMocked.mockImplementation(async () => {
        return {
          status: { code: 200, ok: true },
          success: userServerResponseMock,
        };
      });

      const token = signJwt(userMock.id, userMock.username);

      const response = await request(app)
        .get("/v1/users")
        .set({ Authorization: "Bearer " + token });

      expect(response.statusCode).toBe(200);
      expect(response.body.status.code).toBe(200);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userMock.username);
    });

    it("should fail with code with 401", async () => {
      getUserActionMocked.mockImplementation();

      const response = await request(app).get("/v1/users");

      expect(response.statusCode).toBe(401);
      expect(response.body.status.code).toBe(401);
      expect(response.body.status.ok).toBe(false);
    });
  });
});
