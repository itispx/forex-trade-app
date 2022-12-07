import React from "react";
import styles from "./SignInModal.module.scss";

import Modal from "react-modal";

import useSignInUser from "../../../queries/useSignInUser";

import SignInForm from "../../Forms/SignInForm";

Modal.setAppElement("body");

interface Props {
  show: boolean;
  close: () => void;
}

const SignInModal: React.FC<Props> = ({ show, close }) => {
  const { mutate: signInUser, isLoading } = useSignInUser(close);

  async function submitHandler(username: string, password: string) {
    signInUser({ username, password });
  }

  return (
    <Modal
      testId="sign-in-modal"
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
