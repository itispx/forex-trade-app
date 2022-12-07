import getUserToken from "../getUserToken";

import useUserQueryData from "../../queries/hooks/useUserQueryData";

import { userMock } from "../testing";

jest.mock("../../queries/hooks/useUserQueryData");

const useUserQueryDataMocked = jest.mocked(useUserQueryData, true);

describe("get user token function", () => {
  it("should return undefined", async () => {
    useUserQueryDataMocked.mockImplementation(async () => undefined);

    const token = await getUserToken();

    expect(token).toBe(undefined);
  });

  it("should return token", async () => {
    useUserQueryDataMocked.mockImplementation(async () => userMock);

    const token = await getUserToken();

    expect(token).toBe(userMock.token);
  });
});
