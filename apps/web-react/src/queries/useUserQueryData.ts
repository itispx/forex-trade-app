import queryClient from "../utilities/queryClient";

import { IUserServerResponse } from "interfaces-common";

const useUserQueryData = async () => {
  return (await queryClient.getQueryData("user")) as IUserServerResponse | undefined;
};

export default useUserQueryData;
