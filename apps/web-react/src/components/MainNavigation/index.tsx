import React from "react";
import styles from "./MainNavigation.module.scss";

import { Link, useLocation } from "react-router-dom";

import { useQuery } from "react-query";

import SignInButton from "../Buttons/SignInButton";
import SignUpButton from "../Buttons/SignUpButton";
import Currency from "../Currency";

import { IUserServerResponse } from "interfaces-common";

const MainNavigation: React.FC = () => {
  const { pathname } = useLocation();

  function emptyQuery(): IUserServerResponse | undefined {
    return;
  }

  const { data } = useQuery("user", emptyQuery, {
    enabled: false,
  });

  return (
    <div className={styles["container"]}>
      <div className={styles["inner-container"]}>
        {data ? (
          <div className={styles["signed"]}>
            <div className={styles["route-link"]}>
              {pathname === "/exchanges" ? (
                <Link to="/" className={styles["link"]}>
                  Home
                </Link>
              ) : (
                <Link to="/exchanges" className={styles["link"]}>
                  {data.doc.username}
                </Link>
              )}
            </div>
            <div>
              <Currency symbol="$" name="USD" amount={data.doc.wallet.USD} />
              <Currency symbol="€" name="GBP" amount={data.doc.wallet.GBP} />
            </div>
          </div>
        ) : (
          <div className={styles["not-signed"]}>
            <SignInButton />
            <div style={{ margin: 5 }} />
            <SignUpButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavigation;
