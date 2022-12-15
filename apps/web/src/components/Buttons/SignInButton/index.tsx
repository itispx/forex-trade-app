import React, { useState } from "react";
import styles from "./SignInButton.module.scss";

import SignInModal from "../../Modals/SignInModal";

const SignInButton: React.FC = () => {
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
        data-testid="sign-in-button-container"
        className={styles["container"]}
        onClick={openModal}
      >
        <span className={styles["text"]}>Sign In</span>
      </div>

      <SignInModal show={showModal} close={closeModal} />
    </>
  );
};

export default SignInButton;
