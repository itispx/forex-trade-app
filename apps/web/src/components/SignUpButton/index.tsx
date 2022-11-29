"use client";

import React from "react";
import styles from "./SignUpButton.module.scss";

const SignUpButton: React.FC = () => {
  return (
    <div className={styles["container"]} onClick={() => console.log("sign up press")}>
      <span className={styles["text"]}>Sign Up</span>
    </div>
  );
};

export default SignUpButton;
