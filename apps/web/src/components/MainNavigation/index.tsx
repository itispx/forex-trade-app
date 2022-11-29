import React from "react";
import styles from "./MainNavigation.module.scss";

import SignInButton from "../SignInButton";
import SignUpButton from "../SignUpButton";

const MainNavigation: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["inner-container"]}>
        <SignInButton />
        <div style={{ margin: 5 }} />
        <SignUpButton />
      </div>
    </div>
  );
};

export default MainNavigation;
