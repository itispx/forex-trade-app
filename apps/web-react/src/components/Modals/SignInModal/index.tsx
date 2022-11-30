import React from "react";
import styles from "./SignInModal.module.scss";

import Modal from "react-modal";

import SignInForm from "../../Forms/SignInForm";

Modal.setAppElement("body");

interface Props {
  show: boolean;
  close: () => void;
}

const SignInModal: React.FC<Props> = ({ show, close }) => {
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

        <SignInForm closeModal={close} />
      </div>
    </Modal>
  );
};

export default SignInModal;
