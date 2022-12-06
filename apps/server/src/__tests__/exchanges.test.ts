import request from "supertest";

import app from "../app";

import { connectMongoMemoryServer, disconnectDB, createUserDB } from "../util/testing";

import randomNumber from "../util/randomNumber";

import { IExchangeInfo, OCurrency, IUser } from "interfaces-common";

describe("exchanges", () => {
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
  });

  it("should fail with code 401", async () => {
    const response = await request(app).post("/v1/exchanges").send(exchangeInfo);

    expect(response.statusCode).toBe(401);
    expect(response.body.status.code).toBe(401);
    expect(response.body.status.ok).toBe(false);
  });
});

const makeExchangeInfoObj = (): IExchangeInfo => {
  const baseCurrency = OCurrency[randomNumber(OCurrency.length - 1)];
  const baseAmount = randomNumber(100, 1);

  const convertCurrency = OCurrency.filter((cur) => baseCurrency !== cur)[
    randomNumber(OCurrency.length - 2)
  ];
  const convertAmount = randomNumber(100, 1);

  return {
    base: { currency: baseCurrency, amount: baseAmount },
    convert: { currency: convertCurrency, amount: convertAmount },
  };
};
