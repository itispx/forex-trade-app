import { useMutation } from "react-query";

import queryClient from "../../utilities/queryClient";

import { signInUserQuery } from "../usersQueries";

import { toast } from "react-toastify";

import { useTranslation } from "next-i18next";

const useSignInUser = (close: () => void) => {
  const { t: tToast } = useTranslation("toast");

  const { mutate, isLoading } = useMutation(signInUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 200) {
        queryClient.setQueryData("user", data);
        toast.success(tToast("sign_in_successful"));
        close();
      }
    },
    onError: () => {
      toast.error(tToast("something_went_wrong"));
    },
  });

  return { mutate, isLoading };
};

export default useSignInUser;
