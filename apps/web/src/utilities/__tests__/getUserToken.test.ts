import getUserToken from "../getUserToken";

import getUserQueryData from "../../queries/getUserQueryData";

import { userMock } from "../testing";

jest.mock("../../queries/getUserQueryData");

const getUserQueryDataMocked = jest.mocked(getUserQueryData, true);

describe("get user token function", () => {
  it("should return undefined", async () => {
    getUserQueryDataMocked.mockImplementation(() => undefined);

    const token = getUserToken();

    expect(token).toBe(undefined);
  });

  it("should return token", async () => {
    getUserQueryDataMocked.mockImplementation(() => userMock);

    const token = getUserToken();

    expect(token).toBe(userMock.token);
  });
});
