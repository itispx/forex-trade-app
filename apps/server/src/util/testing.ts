import { IExchange, TStatus } from "interfaces-common";

export const userMock = {
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

export const userServerResponseMock = {
  doc: userMock,
  token: "123_token_123",
};

export const exchangeMock = (status: TStatus): IExchange => {
  return {
    id: "random_exchange_id_123",
    userID: userMock.id,
    base: { currency: "USD", amount: 5 },
    converted: { currency: "GBP", amount: 12 },
    status,
    createdAt: new Date(),
  };
};
