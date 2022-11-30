import React from "react";
import styles from "./SignUpModal.module.scss";

import Modal from "react-modal";

import SignUpForm from "../../Forms/SignUpForm";

Modal.setAppElement("#root");

interface Props {
  show: boolean;
  close: () => void;
}

const SignUpModal: React.FC<Props> = ({ show, close }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={close}
      contentLabel="SignUpModal"
      className={styles["modal"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Sign Up</h1>

        <SignUpForm closeModal={close} />
      </div>
    </Modal>
  );
};

export default SignUpModal;
