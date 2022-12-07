import { useQuery } from "react-query";

import { getUserQuery } from "./usersQueries";

import { toast } from "react-toastify";

import { IQuery, IUserServerResponse } from "interfaces-common";

const useFetchUser = (): { data: (IQuery & IUserServerResponse) | undefined } => {
  const { data } = useQuery("user", getUserQuery, {
    select: (data) => {
      if (data && data.status.ok) {
        return data;
      }

      toast.error("Something went wrong");
    },
    refetchOnWindowFocus: false,
  });

  return { data };
};

export default useFetchUser;
