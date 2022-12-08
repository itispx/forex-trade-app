import {
  getCurrentExchangeValues,
  getExchangesQuery,
  makeExchangeQuery,
} from "../exchangesQueries";

import { connectMongoMemoryServer, disconnectDB, createID } from "../../util/testing";
import { Schema } from "mongoose";

import { ICurrencyInfo } from "interfaces-common";

describe("exchanges queries", () => {
  const userID = createID() as unknown as Schema.Types.ObjectId;

  const base: ICurrencyInfo = {
    currency: "USD",
    amount: 5,
  };
  const convert: ICurrencyInfo = {
    currency: "GBP",
    amount: 15,
  };

  beforeAll(async () => {
    await connectMongoMemoryServer();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe("make exchange", () => {
    it("should make exchange", async () => {
      const response = await makeExchangeQuery(userID, base, convert);

      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);

      expect(response.data.userID).toBe(userID);
      expect(response.data.base.currency).toBe(base.currency);
      expect(response.data.base.amount).toBe(base.amount);
      expect(response.data.converted.currency).toBe(convert.currency);
      expect(response.data.converted.amount).toBe(convert.amount);
    });
  });

  describe("get exchanges", () => {
    beforeAll(async () => {
      for (let i = 0; i < 11; i++) {
        await makeExchangeQuery(userID, base, convert);
      }
    });

    it("should get exchanges on page 0", async () => {
      const response = await getExchangesQuery(userID, 0);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data.length).toBe(5);
    });

    it("should get exchanges on page 1", async () => {
      const response = await getExchangesQuery(userID, 1);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data.length).toBe(5);
    });

    it("should get exchanges on page 2", async () => {
      const response = await getExchangesQuery(userID, 2);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data.length).toBe(2);
    });
  });
});
