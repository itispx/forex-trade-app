/* eslint-disable jest/no-conditional-expect */
import {
  addExchangeQueueAction,
  processExchangeAction,
  getExchangesAction,
  getExchangeValuesAction,
} from "../exchangesActions";

import APIError from "../../util/errors/APIError";

import { userMock, userServerResponseMock, exchangeMock } from "../../util/testing";

import randomNumber from "../../util/randomNumber";

import { IExchange, TCurrencies } from "interfaces-common";

import {
  addExchangeQuery,
  updateExchangeStatusQuery,
  getCurrentExchangeValues,
  getExchangesQuery,
} from "../../queries/exchangesQueries";

jest.mock("../../queries/exchangesQueries", () => {
  return {
    addExchangeQuery: jest.fn(),
    updateExchangeStatusQuery: jest.fn(),
    getCurrentExchangeValues: jest.fn(),
    getExchangesQuery: jest.fn(),
  };
});

const getCurrentExchangeValuesMocked = jest.mocked(getCurrentExchangeValues);
const updateExchangeStatusQueryMocked = jest.mocked(updateExchangeStatusQuery);
const addExchangeQueryMocked = jest.mocked(addExchangeQuery);
const getExchangesQueryMocked = jest.mocked(getExchangesQuery);

import { createExchangesMessageChannel } from "../../messages/messageChannel";
import { Channel } from "amqplib";

jest.mock("../../messages/messageChannel", () => {
  return {
    createExchangesMessageChannel: jest.fn(),
  };
});

const createExchangesMessageChannelMocked = jest.mocked(createExchangesMessageChannel);

import {
  getUserAction,
  addBalanceAction,
  removeBalanceAction,
} from "../../actions/usersActions";

jest.mock("../../actions/usersActions", () => {
  return {
    getUserAction: jest.fn(),
    addBalanceAction: jest.fn(),
    removeBalanceAction: jest.fn(),
  };
});

const getUserActionMocked = jest.mocked(getUserAction);
const addBalanceActionMocked = jest.mocked(addBalanceAction);
const removeBalanceActionMocked = jest.mocked(removeBalanceAction);

describe("exchanges actions", () => {
  describe("get exchanges rate", () => {
    beforeAll(() => {
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
    });

    it("should get the exchanges rate values", async () => {
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

  describe("make exchanges", () => {
    const exchange = exchangeMock("PENDING");

    it("should add exchange to queue", async () => {
      createExchangesMessageChannelMocked.mockImplementation(async () => {
        const mocked = {
          sendToQueue: jest.fn(),
        } as unknown as Channel;

        return mocked;
      });
      addExchangeQueryMocked.mockImplementation(async () => {
        return {
          status: { code: 201, ok: true },
          data: exchange,
        };
      });

      const response = await addExchangeQueueAction(
        userMock.id,
        exchange.base,
        exchange.converted,
      );

      expect(createExchangesMessageChannelMocked).toHaveBeenCalledTimes(1);
      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(response.success.doc.userID).toBe(userMock.id);
      expect(response.success.doc.base).toMatchObject(exchange.base);
      expect(response.success.doc.converted).toMatchObject(exchange.converted);
    });

    it("should process exchange", async () => {
      getUserActionMocked.mockImplementation(async () => {
        return {
          status: { code: 201, ok: true },
          success: userServerResponseMock,
        };
      });
      addBalanceActionMocked.mockImplementation();
      removeBalanceActionMocked.mockImplementation();
      updateExchangeStatusQueryMocked.mockImplementation(async () => {
        return {
          status: { code: 201, ok: true },
          data: exchangeMock("SUCCESSFUL"),
        };
      });

      const response = await processExchangeAction(exchange);

      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(response.success.doc.id).toBe(exchange.id);
      expect(response.success.doc.userID).toBe(exchange.userID);
      expect(response.success.doc.status).toBe("SUCCESSFUL");
      expect(updateExchangeStatusQueryMocked).toHaveBeenCalledTimes(1);
    });

    it("should fail because user was not found", async () => {
      getUserActionMocked.mockImplementation(async () => {
        throw APIError.notFound();
      });
      updateExchangeStatusQueryMocked.mockRestore();

      try {
        await processExchangeAction(exchange);
      } catch (error) {
        expect(error).toStrictEqual(APIError.notFound());
        expect(updateExchangeStatusQueryMocked).toHaveBeenCalledTimes(1);
        expect(updateExchangeStatusQueryMocked).toHaveBeenCalledWith(
          exchange.id,
          "FAILED",
        );
      }
    });

    it("should fail because user does not have enough money", async () => {
      getUserActionMocked.mockImplementation(async () => {
        return {
          status: { code: 200, ok: true },
          success: {
            ...userServerResponseMock,
            doc: {
              ...userServerResponseMock.doc,
              wallet: {
                ...userServerResponseMock.doc.wallet,
                [exchange.base.currency]: 0,
              },
            },
          },
        };
      });
      updateExchangeStatusQueryMocked.mockRestore();

      try {
        await processExchangeAction(exchange);
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
        expect((error as APIError).status.code).toBe(403);
        expect(updateExchangeStatusQueryMocked).toHaveBeenCalledTimes(1);
        expect(updateExchangeStatusQueryMocked).toHaveBeenCalledWith(
          exchange.id,
          "FAILED",
        );
      }
    });
  });

  describe("get exchanges", () => {
    const exchange = exchangeMock("SUCCESSFUL");
    const exchangesArr: IExchange[] = [exchange, exchange, exchange, exchange, exchange];

    beforeAll(() => {
      getExchangesQueryMocked.mockImplementation(async () => {
        return {
          status: { code: 200, ok: true },
          data: exchangesArr,
        };
      });
    });

    it("should get exchanges", async () => {
      const response = await getExchangesAction(userMock.id, 0);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.success.docs.length).toBe(5);
    });
  });
});
