import { useMutation } from "react-query";

import queryClient from "../../utilities/queryClient";

import { performExchangeQuery } from "../exchangesQueries";

import { toast } from "react-toastify";

import { useTranslation } from "next-i18next";

const usePostExchange = (close: () => void) => {
  const { t: tToast } = useTranslation("toast");

  const { mutate, isLoading } = useMutation(performExchangeQuery, {
    onSuccess: (data) => {
      if (data.status.code === 201) {
        toast.success(tToast("exchange_successful"));
        close();
      }
    },
    onError: () => {
      toast.error(tToast("something_went_wrong"));
    },
    onSettled: () => {
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("exchanges");
    },
  });

  return { mutate, isLoading };
};

export default usePostExchange;
