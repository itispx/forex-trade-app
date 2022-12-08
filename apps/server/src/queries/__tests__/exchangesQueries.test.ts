import {
  getCurrentExchangeValues,
  getExchangesQuery,
  makeExchangeQuery,
} from "../exchangesQueries";

import { connectMongoMemoryServer, disconnectDB, createID } from "../../util/testing";
import { Schema } from "mongoose";

import { ICurrencyInfo } from "interfaces-common";

import axios from "axios";

jest.mock("axios");

const axiosMocked = jest.mocked(axios);

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

  describe("get exchanges rates", () => {
    beforeAll(() => {
      axiosMocked.get.mockImplementation(async (url) => {
        if (
          url === `https://api.fastforex.io/fetch-one?from=USD&to=GBP&api_key=undefined`
        ) {
          return {
            data: {
              base: "USD",
              result: { GBP: 0.823 },
              updated: "2022-12-08 12:04:43",
              ms: 2,
            },
          };
        } else {
          return {
            data: {
              base: "GBP",
              result: { USD: 1.32 },
              updated: "2022-12-08 12:04:43",
              ms: 2,
            },
          };
        }
      });
    });

    it("should get rates USD > GBP", async () => {
      const response = await getCurrentExchangeValues("USD", "GBP");

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data.base).toBe("USD");
      expect(response.data.converted).toBe("GBP");
      expect(response.data.exchangeRate).toBe(0.823);
    });

    it("should get rates GBP > USD", async () => {
      const response = await getCurrentExchangeValues("GBP", "USD");

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data.base).toBe("GBP");
      expect(response.data.converted).toBe("USD");
      expect(response.data.exchangeRate).toBe(1.32);
    });
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
