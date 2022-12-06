import React, { useState } from "react";
import styles from "./SignUpButton.module.scss";

import SignUpModal from "../../Modals/SignUpModal";

const SignUpButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <div
        id="sign-up-button-container"
        className={styles["container"]}
        onClick={openModal}
      >
        <span className={styles["text"]}>Sign Up</span>
      </div>

      <SignUpModal show={showModal} close={closeModal} />
    </>
  );
};

export default SignUpButton;
