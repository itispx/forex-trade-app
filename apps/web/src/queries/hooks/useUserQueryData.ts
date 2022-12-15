import queryClient from "../../utilities/queryClient";

import { IUserServerResponse } from "interfaces-common";

const useUserQueryData = (): IUserServerResponse | undefined => {
  return queryClient.getQueryData("user") as IUserServerResponse | undefined;
};

export default useUserQueryData;
