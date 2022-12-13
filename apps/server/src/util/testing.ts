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
