import request from "supertest";

import app from "../../app";

import {
  connectMongoMemoryServer,
  disconnectDB,
  createUserDB,
  makeExchangeInfoObj,
} from "../../util/testing";

import { IExchangeInfo, IUser } from "interfaces-common";

describe("exchanges routes", () => {
  let exchangeInfo: IExchangeInfo | undefined = undefined;
  let userPayload: IUser | undefined = undefined;
  let token = "";

  beforeAll(async () => {
    await connectMongoMemoryServer();

    exchangeInfo = makeExchangeInfoObj();

    const { doc, token: createdUserToken } = await createUserDB(app);

    userPayload = doc;
    token = createdUserToken;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe("make exchange", () => {
    it("should make successful exchange", async () => {
      if (!userPayload || !exchangeInfo) return;

      const response = await request(app)
        .post("/v1/exchanges")
        .set({ Authorization: "Bearer " + token })
        .send(exchangeInfo);

      expect(response.statusCode).toBe(201);
      expect(response.body.status.code).toBe(201);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.userID).toBe(userPayload._id);
      expect(response.body.success.doc.base.currency).toBe(exchangeInfo.base.currency);
      expect(response.body.success.doc.base.amount).toBe(exchangeInfo.base.amount);
      expect(response.body.success.doc.converted.currency).toBe(
        exchangeInfo.convert.currency,
      );
      expect(response.body.success.doc.converted.amount).toBe(
        exchangeInfo.convert.amount,
      );
      expect(typeof response.body.success.doc.createdAt).toBe("string");
    });

    it("should fail with code 401", async () => {
      const response = await request(app).post("/v1/exchanges").send(exchangeInfo);

      expect(response.statusCode).toBe(401);
      expect(response.body.status.code).toBe(401);
      expect(response.body.status.ok).toBe(false);
    });
  });

  describe("get user past exchanges", () => {
    beforeAll(async () => {
      for (let i = 0; i < 11; i++) {
        await request(app)
          .post("/v1/exchanges")
          .set({ Authorization: "Bearer " + token })
          .send(exchangeInfo);
      }
    });

    it("should get exchanges on page 0", async () => {
      const response = await request(app)
        .get("/v1/exchanges")
        .set({ Authorization: "Bearer " + token })
        .query({ page: 0 });

      expect(response.statusCode).toBe(200);
      expect(response.body.success.docs.length).toBe(5);
    });

    it("should get exchanges on page 1", async () => {
      const response = await request(app)
        .get("/v1/exchanges")
        .set({ Authorization: "Bearer " + token })
        .query({ page: 1 });

      expect(response.statusCode).toBe(200);
      expect(response.body.success.docs.length).toBe(5);
    });

    it("should get exchanges on page 2", async () => {
      const response = await request(app)
        .get("/v1/exchanges")
        .set({ Authorization: "Bearer " + token })
        .query({ page: 2 });

      expect(response.statusCode).toBe(200);
      expect(response.body.success.docs.length).toBe(2);
    });

    it("should get exchanges on page 0 without passing query params", async () => {
      const response = await request(app)
        .get("/v1/exchanges")
        .set({ Authorization: "Bearer " + token });

      expect(response.statusCode).toBe(200);
      expect(response.body.success.docs.length).toBe(5);
    });

    it("should fail get exchanges with code 401", async () => {
      const response = await request(app).get("/v1/exchanges");

      expect(response.statusCode).toBe(401);
      expect(response.body.status.code).toBe(401);
      expect(response.body.status.ok).toBe(false);
    });
  });
});
