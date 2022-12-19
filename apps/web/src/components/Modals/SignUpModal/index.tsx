import React from "react";
import styles from "./SignUpModal.module.scss";

import { useTranslation } from "next-i18next";

import Modal from "react-modal";

import useSignUpUser from "../../../queries/hooks/useSignUpUser";

import SignUpForm from "../../Forms/SignUpForm";

Modal.setAppElement("body");

interface Props {
  show: boolean;
  close: () => void;
}

const SignUpModal: React.FC<Props> = ({ show, close }) => {
  const { t } = useTranslation("auth");

  const { mutate: signUpUser, isLoading } = useSignUpUser(close);

  async function submitHandler(username: string, password: string) {
    signUpUser({ username, password });
  }

  return (
    <Modal
      testId="sign-up-modal"
      isOpen={show}
      onRequestClose={close}
      contentLabel="SignUpModal"
      className={styles["modal"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>{t("sign_up")}</h1>

        <SignUpForm submitHandler={submitHandler} isLoading={isLoading} />
      </div>
    </Modal>
  );
};

export default SignUpModal;
