import request from "supertest";

import { Express } from "express";

import randomNumber from "./randomNumber";

import { IUserServerResponse, IExchangeInfo, OCurrency, IUser } from "interfaces-common";

export const createUserDB = async (app: Express): Promise<IUserServerResponse> => {
  const response = await request(app).post("/v1/users/signup").send(userPayload);

  return response.body.success;
};

export const makeExchangeInfoObj = (): IExchangeInfo => {
  const baseCurrency = OCurrency[randomNumber(OCurrency.length - 1)];
  const baseAmount = randomNumber(80, 1);

  const convertCurrency = OCurrency.filter((cur) => baseCurrency !== cur)[
    randomNumber(OCurrency.length - 2)
  ];
  const convertAmount = randomNumber(80, 1);

  return {
    base: { currency: baseCurrency, amount: baseAmount },
    convert: { currency: convertCurrency, amount: convertAmount },
  };
};

export const userPayload = {
  _id: "",
  username: "test_username",
  password: "test_password",
};

export const userMock: IUser = {
  id: "01234567890",
  username: "test_username",
  password: "test_password",
  wallet: {
    id: "abcdefg",
    userID: "01234567890",
    GBP: 1000,
    USD: 1000,
  },
  createdAt: new Date(),
};

export const userServerResponseMock: IUserServerResponse = {
  doc: userMock,
  token: "123_token_123",
};
