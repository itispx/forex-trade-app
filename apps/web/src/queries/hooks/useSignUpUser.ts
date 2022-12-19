import { useMutation } from "react-query";

import queryClient from "../../utilities/queryClient";

import { signUpUserQuery } from "../usersQueries";

import { toast } from "react-toastify";

import { useTranslation } from "next-i18next";

const useSignUpUser = (close: () => void) => {
  const { t: tToast } = useTranslation("toast");

  const { mutate, isLoading } = useMutation(signUpUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 201) {
        queryClient.setQueryData("user", data);
        toast.success(tToast("sign_up_successful"));
        close();
      }
    },
    onError: () => {
      toast.error(tToast("something_went_wrong"));
    },
  });

  return { mutate, isLoading };
};

export default useSignUpUser;
