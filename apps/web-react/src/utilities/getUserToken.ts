import queryClient from "./queryClient";

import { IUserServerResponse } from "interfaces-common";

const getUserToken = async (): Promise<string | undefined> => {
  const data = (await queryClient.getQueryData("user")) as
    | IUserServerResponse
    | undefined;

  return data?.token;
};

export default getUserToken;
