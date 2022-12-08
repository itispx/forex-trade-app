import request from "supertest";

import app from "../../app";

import {
  connectMongoMemoryServer,
  disconnectDB,
  createUserDB,
  makeExchangeInfoObj,
} from "../../util/testing";

import randomNumber from "../../util/randomNumber";

import { IExchangeInfo, IUser, TCurrencies } from "interfaces-common";

import { getCurrentExchangeValues } from "../../queries/exchangesQueries";

import { getExchangeValuesAction } from "../../actions/exchangesActions";

jest.mock("../../queries/exchangesQueries", () => {
  const original = jest.requireActual("../../queries/exchangesQueries");
  return {
    ...original,
    getCurrentExchangeValues: jest.fn(),
  };
});

const getCurrentExchangeValuesMocked = jest.mocked(getCurrentExchangeValues);

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

  describe("get exchanges rate", () => {
    it("should get the exchanges rate values", async () => {
      getCurrentExchangeValuesMocked.mockImplementation(
        async (base: TCurrencies, converted: TCurrencies) => {
          return {
            status: { code: 200, ok: true },
            data: {
              base,
              converted,
              exchangeRate: randomNumber(3, 1),
            },
          };
        },
      );

      const data = await getExchangeValuesAction();

      expect(data.length).toBe(2);

      expect(data[0].base).toBe("USD");
      expect(data[0].converted).toBe("GBP");
      expect(typeof data[0].exchangeRate).toBe("number");

      expect(data[1].base).toBe("GBP");
      expect(data[1].converted).toBe("USD");
      expect(typeof data[1].exchangeRate).toBe("number");
    });
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
