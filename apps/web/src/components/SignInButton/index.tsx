"use client";

import React from "react";
import styles from "./SignInButton.module.scss";

const SignInButton: React.FC = () => {
  return (
    <div className={styles["container"]} onClick={() => console.log("sign in press")}>
      <span className={styles["text"]}>Sign In</span>
    </div>
  );
};

export default SignInButton;
