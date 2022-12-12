import {
  makeExchangeAction,
  getExchangesAction,
  getExchangeValuesAction,
} from "../exchangesActions";

import { userMock, userServerResponseMock } from "../../util/testing";

import randomNumber from "../../util/randomNumber";

import { ICurrencyInfo, IExchange, TCurrencies } from "interfaces-common";

import {
  getCurrentExchangeValues,
  makeExchangeQuery,
  getExchangesQuery,
} from "../../queries/exchangesQueries";

jest.mock("../../queries/exchangesQueries", () => {
  return {
    getCurrentExchangeValues: jest.fn(),
    makeExchangeQuery: jest.fn(),
    getExchangesQuery: jest.fn(),
  };
});

const getCurrentExchangeValuesMocked = jest.mocked(getCurrentExchangeValues);
const makeExchangeQueryMocked = jest.mocked(makeExchangeQuery);
const getExchangesQueryMocked = jest.mocked(getExchangesQuery);

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
  const base: ICurrencyInfo = { currency: "USD", amount: 5 };
  const convert: ICurrencyInfo = { currency: "GBP", amount: 12 };

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
    it("should make exchange", async () => {
      getUserActionMocked.mockImplementation(async () => {
        return {
          status: { code: 201, ok: true },
          success: userServerResponseMock,
        };
      });
      makeExchangeQueryMocked.mockImplementation(
        async (userID: string, base: ICurrencyInfo, converted: ICurrencyInfo) => {
          return {
            status: { code: 201, ok: true },
            data: {
              id: "random_exchange_id_123",
              userID,
              base,
              converted,
              createdAt: new Date(),
            },
          };
        },
      );
      addBalanceActionMocked.mockImplementation();
      removeBalanceActionMocked.mockImplementation();

      const response = await makeExchangeAction(userMock.id, base, convert);

      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(response.success.doc.userID).toBe(userMock.id);
      expect(response.success.doc.base).toMatchObject(base);
      expect(response.success.doc.converted).toMatchObject(convert);
    });
  });

  describe("get exchanges", () => {
    const exchangesArr: IExchange[] = [
      { id: "1", userID: userMock.id, base, converted: convert, createdAt: new Date() },
      { id: "2", userID: userMock.id, base, converted: convert, createdAt: new Date() },
      { id: "3", userID: userMock.id, base, converted: convert, createdAt: new Date() },
      { id: "4", userID: userMock.id, base, converted: convert, createdAt: new Date() },
      { id: "5", userID: userMock.id, base, converted: convert, createdAt: new Date() },
    ];

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
