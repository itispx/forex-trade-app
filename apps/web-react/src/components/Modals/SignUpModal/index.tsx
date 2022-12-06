import React from "react";
import styles from "./SignUpModal.module.scss";

import Modal from "react-modal";

import queryClient from "../../../utilities/queryClient";
import { useMutation } from "react-query";
import { signUpUserQuery } from "../../../queries/usersQueries";

import { toast } from "react-toastify";

import SignUpForm from "../../Forms/SignUpForm";

Modal.setAppElement("body");

interface Props {
  show: boolean;
  close: () => void;
}

const SignUpModal: React.FC<Props> = ({ show, close }) => {
  const { mutate: signUpUser, isLoading } = useMutation(signUpUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 201) {
        queryClient.setQueryData("user", data);
        close();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function submitHandler(username: string, password: string) {
    signUpUser({ username, password });
  }

  return (
    <Modal
      id="sign-up-modal"
      testId="sign-up-modal"
      isOpen={show}
      onRequestClose={close}
      contentLabel="SignUpModal"
      className={styles["modal"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Sign Up</h1>

        <SignUpForm submitHandler={submitHandler} isLoading={isLoading} />
      </div>
    </Modal>
  );
};

export default SignUpModal;
