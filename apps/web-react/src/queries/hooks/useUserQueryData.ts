import queryClient from "../../utilities/queryClient";

import { IUserServerResponse } from "interfaces-common";

const useUserQueryData = async (): Promise<IUserServerResponse | undefined> => {
  return (await queryClient.getQueryData("user")) as IUserServerResponse | undefined;
};

export default useUserQueryData;
