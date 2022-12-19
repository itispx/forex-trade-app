import { useQuery } from "react-query";

import { getUserQuery } from "../usersQueries";

import { toast } from "react-toastify";

import { useTranslation } from "next-i18next";

import { IQuery, IUserServerResponse } from "interfaces-common";

const useFetchUser = (): { data: (IQuery & IUserServerResponse) | undefined } => {
  const { t: tToast } = useTranslation("toast");

  const { data } = useQuery("user", getUserQuery, {
    select: (data) => {
      if (data && data.status.ok) {
        return data;
      }

      toast.error(tToast("something_went_wrong"));
    },
    refetchOnWindowFocus: false,
  });

  return { data };
};

export default useFetchUser;
