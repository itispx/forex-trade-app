import React from "react";
import styles from "./SignInModal.module.scss";

import Modal from "react-modal";

import queryClient from "../../../utilities/queryClient";
import { useMutation } from "react-query";
import { signInUserQuery } from "../../../queries/usersQueries";

import { toast } from "react-toastify";

import SignInForm from "../../Forms/SignInForm";

Modal.setAppElement("body");

interface Props {
  show: boolean;
  close: () => void;
}

const SignInModal: React.FC<Props> = ({ show, close }) => {
  const { mutate: signInUser, isLoading } = useMutation(signInUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 200) {
        queryClient.setQueryData("user", data.success);
        close();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled: () => queryClient.invalidateQueries("user"),
  });

  async function submitHandler(username: string, password: string) {
    signInUser({ username, password });
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={close}
      contentLabel="SignInModal"
      className={styles["modal"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Sign In</h1>

        <SignInForm submitHandler={submitHandler} isLoading={isLoading} />
      </div>
    </Modal>
  );
};

export default SignInModal;
