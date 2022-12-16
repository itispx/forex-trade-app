import { useMutation } from "react-query";

import queryClient from "../../utilities/queryClient";

import { signUpUserQuery } from "../usersQueries";

import { toast } from "react-toastify";

const useSignUpUser = (close: () => void) => {
  const { mutate, isLoading } = useMutation(signUpUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 201) {
        queryClient.setQueryData("user", data);
        toast.success("Sign up successful!");
        close();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { mutate, isLoading };
};

export default useSignUpUser;
