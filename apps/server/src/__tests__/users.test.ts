import request from "supertest";

import app from "../app";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("users", () => {
  const userPayload = {
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

  describe("sign up tests", () => {
    it("should sign up user", async () => {
      const response = await request(app).post("/v1/users/signup").send(userPayload);

      expect(response.statusCode).toBe(201);
      expect(response.body.status.code).toBe(201);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.username).toBe(userPayload.username);
    });

    it("should failed to sign up the same user twice", async () => {
      const response = await request(app).post("/v1/users/signup").send(userPayload);

      expect(response.statusCode).toBe(409);
      expect(response.body.status.code).toBe(409);
      expect(response.body.status.ok).toBe(false);
    });
  });
});
