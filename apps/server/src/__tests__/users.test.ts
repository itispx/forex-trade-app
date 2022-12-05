import request from "supertest";

import app from "../app";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import jwt from "jsonwebtoken";

describe("users", () => {
  const userPayload = {
    _id: "",
    username: "test_username",
    password: "test_password",
  };

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("sign up", () => {
    it("should sign up user", async () => {
      const response = await request(app).post("/v1/users/signup").send(userPayload);

      expect(response.statusCode).toBe(201);
      expect(response.body.status.code).toBe(201);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userPayload.username);
      expect(response.body.success.doc.wallet.USD).toBe(1000);
      expect(response.body.success.doc.wallet.GBP).toBe(0);
      expect(typeof response.body.success.token).toBe("string");

      userPayload._id = response.body.success.doc._id;
    });

    it("should failed to sign up the same user twice", async () => {
      const response = await request(app).post("/v1/users/signup").send(userPayload);

      expect(response.statusCode).toBe(409);
      expect(response.body.status.code).toBe(409);
      expect(response.body.status.ok).toBe(false);
    });
  });

  describe("sign in", () => {
    it("should sign in the user", async () => {
      const response = await request(app).post("/v1/users/signin").send(userPayload);

      expect(response.statusCode).toBe(200);
      expect(response.body.status.code).toBe(200);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userPayload.username);
      expect(typeof response.body.success.token).toBe("string");
    });

    it("should fail to sign in user with wrong password", async () => {
      const response = await request(app)
        .post("/v1/users/signin")
        .send({ username: userPayload.username, password: "wrong password" });

      expect(response.statusCode).toBe(401);
      expect(response.body.status.code).toBe(401);
      expect(response.body.status.ok).toBe(false);
    });
  });

  describe("get user", () => {
    it("should get the user", async () => {
      const token = jwt.sign(
        { userID: userPayload._id, username: userPayload.username },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" },
      );

      const response = await request(app)
        .get("/v1/users")
        .set({ Authorization: "Bearer " + token });

      expect(response.statusCode).toBe(200);
      expect(response.body.status.code).toBe(200);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userPayload.username);
    });

    it("should fail with code with 401", async () => {
      const response = await request(app).get("/v1/users");

      expect(response.statusCode).toBe(401);
      expect(response.body.status.code).toBe(401);
      expect(response.body.status.ok).toBe(false);
    });
  });
});
