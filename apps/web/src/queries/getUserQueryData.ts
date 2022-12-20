import queryClient from "../utilities/queryClient";

import { IUserServerResponse } from "interfaces-common";

const getUserQueryData = (): IUserServerResponse | undefined => {
  return queryClient.getQueryData("user") as IUserServerResponse | undefined;
};

export default getUserQueryData;
