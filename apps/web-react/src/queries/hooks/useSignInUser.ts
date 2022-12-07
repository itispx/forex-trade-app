import { useMutation } from "react-query";

import queryClient from "../../utilities/queryClient";

import { signInUserQuery } from "../usersQueries";

import { toast } from "react-toastify";

const useSignInUser = (close: () => void) => {
  const { mutate, isLoading } = useMutation(signInUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 200) {
        queryClient.setQueryData("user", data);
        close();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { mutate, isLoading };
};

export default useSignInUser;
