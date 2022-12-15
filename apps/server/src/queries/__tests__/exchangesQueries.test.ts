import {
  addExchangeQuery,
  updateExchangeStatusQuery,
  getCurrentExchangeValues,
  getExchangesQuery,
} from "../exchangesQueries";

import { userMock } from "../../util/testing";

import { ICurrencyInfo } from "interfaces-common";

import axios from "axios";

import { Exchange } from "@prisma/client";

jest.mock("axios");

const axiosMocked = jest.mocked(axios);

import prisma from "../../util/prisma/client";

describe("exchanges queries", () => {
  const base: ICurrencyInfo = { currency: "USD", amount: 5 };
  const convert: ICurrencyInfo = { currency: "GBP", amount: 15 };

  const baseExchange = {
    id: "123_exchange_id_123",
    userID: userMock.id,
    baseCurrency: base.currency,
    baseAmount: base.amount,
    convertedCurrency: convert.currency,
    convertedAmount: convert.amount,
    createdAt: new Date(),
  };

  beforeEach(() => {
    prisma.exchange.create = jest.fn();
    prisma.exchange.update = jest.fn();
    prisma.exchange.findMany = jest.fn();
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
      jest
        .spyOn(prisma.exchange, "create")
        .mockResolvedValue({ ...baseExchange, status: "PENDING" });

      const response = await addExchangeQuery(userMock.id, base, convert);

      expect(prisma.exchange.create).toHaveBeenCalledWith({
        data: {
          userID: userMock.id,
          baseCurrency: base.currency,
          baseAmount: base.amount,
          convertedCurrency: convert.currency,
          convertedAmount: convert.amount,
          status: "PENDING",
        },
      });
      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(response.data.userID).toBe(userMock.id);
      expect(response.data.base.currency).toBe(base.currency);
      expect(response.data.base.amount).toBe(base.amount);
      expect(response.data.converted.currency).toBe(convert.currency);
      expect(response.data.converted.amount).toBe(convert.amount);
    });
  });

  describe("update exchange", () => {
    it("should update exchange with SUCCESSFUL status", async () => {
      const exchange: Exchange = { ...baseExchange, status: "SUCCESSFUL" };

      jest.spyOn(prisma.exchange, "update").mockResolvedValue(exchange);

      const response = await updateExchangeStatusQuery(exchange.id, "SUCCESSFUL");

      expect(prisma.exchange.update).toHaveBeenCalledWith({
        where: { id: exchange.id },
        data: { status: "SUCCESSFUL" },
      });
      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(response.data.userID).toBe(userMock.id);
      expect(response.data.base.currency).toBe(base.currency);
      expect(response.data.base.amount).toBe(base.amount);
      expect(response.data.converted.currency).toBe(convert.currency);
      expect(response.data.converted.amount).toBe(convert.amount);
    });

    it("should update exchange with FAILED status", async () => {
      const exchange: Exchange = { ...baseExchange, status: "FAILED" };

      jest.spyOn(prisma.exchange, "update").mockResolvedValue(exchange);

      const response = await updateExchangeStatusQuery(exchange.id, "FAILED");

      expect(prisma.exchange.update).toHaveBeenCalledWith({
        where: { id: exchange.id },
        data: { status: "FAILED" },
      });
      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(response.data.userID).toBe(userMock.id);
      expect(response.data.base.currency).toBe(base.currency);
      expect(response.data.base.amount).toBe(base.amount);
      expect(response.data.converted.currency).toBe(convert.currency);
      expect(response.data.converted.amount).toBe(convert.amount);
    });
  });

  describe("get exchanges", () => {
    it("should get exchanges", async () => {
      const exchange: Exchange = { ...baseExchange, status: "SUCCESSFUL" };

      jest
        .spyOn(prisma.exchange, "findMany")
        .mockResolvedValue([exchange, exchange, exchange, exchange, exchange]);

      const response = await getExchangesQuery(userMock.id, 0);

      expect(prisma.exchange.findMany).toHaveBeenCalledWith({
        where: { userID: userMock.id },
        skip: 0 * 5,
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });
      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.data.length).toBe(5);
    });
  });
});
