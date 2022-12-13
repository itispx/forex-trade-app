import request from "supertest";

import app from "../../app";

import signJwt from "../../util/signJwt";

import { userMock } from "../../util/testing";

import { ICurrencyInfo, IExchange } from "interfaces-common";

import { makeExchangeAction, getExchangesAction } from "../../actions/exchangesActions";

jest.mock("../../actions/exchangesActions", () => {
  const original = jest.requireActual("../../actions/exchangesActions");

  return {
    ...original,
    makeExchangeAction: jest.fn(),
    getExchangesAction: jest.fn(),
  };
});

const makeExchangeActionMocked = jest.mocked(makeExchangeAction);
const getExchangesActionMocked = jest.mocked(getExchangesAction);

describe("exchanges routes", () => {
  const token = signJwt(userMock.id, userMock.username);

  const base: ICurrencyInfo = { currency: "USD", amount: 5 };
  const convert: ICurrencyInfo = { currency: "GBP", amount: 12 };

  const exchangeInfo = { base, convert };

  const exchangesArr: IExchange[] = [
    { id: "1", userID: userMock.id, base, converted: convert, createdAt: new Date() },
    { id: "2", userID: userMock.id, base, converted: convert, createdAt: new Date() },
    { id: "3", userID: userMock.id, base, converted: convert, createdAt: new Date() },
    { id: "4", userID: userMock.id, base, converted: convert, createdAt: new Date() },
    { id: "5", userID: userMock.id, base, converted: convert, createdAt: new Date() },
  ];

  describe("make exchange", () => {
    it("should make successful exchange", async () => {
      makeExchangeActionMocked.mockImplementation(async () => {
        return {
          status: { code: 201, ok: true },
          success: {
            doc: {
              id: "123_exchange_id_123",
              userID: userMock.id,
              base: exchangeInfo.base,
              converted: exchangeInfo.convert,
              createdAt: new Date(),
            },
          },
        };
      });

      const response = await request(app)
        .post("/v1/exchanges")
        .set({ Authorization: "Bearer " + token })
        .send(exchangeInfo);

      expect(response.statusCode).toBe(201);
      expect(response.body.status.code).toBe(201);
      expect(response.body.status.ok).toBe(true);
      expect(response.body.success.doc.userID).toBe(userMock.id);
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
    beforeAll(() => {
      getExchangesActionMocked.mockImplementation(async () => {
        return {
          status: { code: 200, ok: true },
          success: { docs: exchangesArr },
        };
      });
    });

    it("should get exchanges on page 0", async () => {
      const response = await request(app)
        .get("/v1/exchanges")
        .set({ Authorization: "Bearer " + token })
        .query({ page: 0 });

      expect(response.statusCode).toBe(200);
      expect(response.body.success.docs.length).toBe(5);
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
