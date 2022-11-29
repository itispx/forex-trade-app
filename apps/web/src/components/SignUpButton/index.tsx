"use client";

import React, { useState } from "react";
import styles from "./SignUpButton.module.scss";

import SignUpModal from "../SignUpModal";

const SignUpButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  return (
    <div className={styles["container"]} onClick={openModal}>
      <span className={styles["text"]}>Sign Up</span>
      <SignUpModal show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default SignUpButton;
