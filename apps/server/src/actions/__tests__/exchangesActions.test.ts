import {
  makeExchangeAction,
  getExchangesAction,
  getExchangeValuesAction,
} from "../exchangesActions";

import app from "../../app";

import { connectMongoMemoryServer, disconnectDB, createUserDB } from "../../util/testing";

import randomNumber from "../../util/randomNumber";

import { IUser, ICurrencyInfo, TCurrencies } from "interfaces-common";

import { getCurrentExchangeValues } from "../../queries/exchangesQueries";

jest.mock("../../queries/exchangesQueries", () => {
  const original = jest.requireActual("../../queries/exchangesQueries");
  return {
    ...original,
    getCurrentExchangeValues: jest.fn(),
  };
});

const getCurrentExchangeValuesMocked = jest.mocked(getCurrentExchangeValues);

describe("exchanges actions", () => {
  let userPayload: IUser | undefined = undefined;

  const base: ICurrencyInfo = { currency: "USD", amount: 5 };
  const convert: ICurrencyInfo = { currency: "GBP", amount: 12 };

  beforeAll(async () => {
    await connectMongoMemoryServer();

    const { doc } = await createUserDB(app);

    userPayload = doc;
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

  describe("make exchanges", () => {
    it("should make exchange", async () => {
      if (!userPayload) throw new Error("No user");

      const response = await makeExchangeAction(userPayload._id, base, convert);

      expect(response.status.code).toBe(201);
      expect(response.status.ok).toBe(true);
      expect(`${response.success.doc.userID}`).toBe(`${userPayload._id}`);
      expect(response.success.doc.base).toMatchObject(base);
      expect(response.success.doc.converted).toMatchObject(convert);
    });
  });

  describe("get exchanges", () => {
    beforeAll(async () => {
      if (!userPayload) throw new Error("No user");

      for (let i = 0; i < 11; i++) {
        await makeExchangeAction(userPayload._id, base, convert);
      }
    });

    it("should get exchanges on page 0", async () => {
      if (!userPayload) throw new Error("No user");

      const response = await getExchangesAction(userPayload._id, 0);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.success.docs.length).toBe(5);
    });

    it("should get exchanges on page 1", async () => {
      if (!userPayload) throw new Error("No user");

      const response = await getExchangesAction(userPayload._id, 1);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.success.docs.length).toBe(5);
    });

    it("should get exchanges on page 2", async () => {
      if (!userPayload) throw new Error("No user");

      const response = await getExchangesAction(userPayload._id, 2);

      expect(response.status.code).toBe(200);
      expect(response.status.ok).toBe(true);
      expect(response.success.docs.length).toBe(2);
    });
  });
});
