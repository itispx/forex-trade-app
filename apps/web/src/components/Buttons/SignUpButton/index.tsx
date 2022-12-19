import React, { useState } from "react";
import styles from "./SignUpButton.module.scss";

import { useTranslation } from "next-i18next";

import SignUpModal from "../../Modals/SignUpModal";

const SignUpButton: React.FC = () => {
  const { t } = useTranslation("auth");

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
        data-testid="sign-up-button-container"
        className={styles["container"]}
        onClick={openModal}
      >
        <span className={styles["text"]}>{t("sign_up")}</span>
      </div>

      <SignUpModal show={showModal} close={closeModal} />
    </>
  );
};

export default SignUpButton;
