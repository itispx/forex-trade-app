import React from "react";
import styles from "./SignUpModal.module.scss";

import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpModal: React.FC<Props> = ({ show, setShow }) => {
  function closeModal() {
    setShow(false);
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={closeModal}
      contentLabel="SignUpModal"
      className={styles["modal"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <span>1</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </Modal>
  );
};

export default SignUpModal;
