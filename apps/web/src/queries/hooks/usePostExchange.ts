import { useMutation } from "react-query";

import queryClient from "../../utilities/queryClient";

import { performExchangeQuery } from "../exchangesQueries";

import { toast } from "react-toastify";

const usePostExchange = (close: () => void) => {
  const { mutate, isLoading } = useMutation(performExchangeQuery, {
    onSuccess: (data) => {
      if (data.status.code === 201) {
        toast.success("Exchange successful!");
        close();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("exchanges");
    },
  });

  return { mutate, isLoading };
};

export default usePostExchange;
