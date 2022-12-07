import React from "react";
import styles from "./MainNavigation.module.scss";

import { Link, useLocation } from "react-router-dom";

import useFetchUser from "../../queries/hooks/useFetchUser";

import SignInButton from "../Buttons/SignInButton";
import SignUpButton from "../Buttons/SignUpButton";
import Currency from "../Currency";

import { TCurrencies } from "interfaces-common";

const MainNavigation: React.FC = () => {
  const { pathname } = useLocation();

  const { data } = useFetchUser();

  return (
    <div data-testid="main-navigation-container" className={styles["container"]}>
      <div className={styles["inner-container"]}>
        {data ? (
          <div className={styles["signed"]}>
            {pathname === "/exchanges" ? (
              <Link to="/" className={styles["route-link"]}>
                <span data-testid="link" className={styles["link"]}>
                  Home
                </span>
              </Link>
            ) : (
              <Link to="/exchanges" className={styles["route-link"]}>
                <span data-testid="link" className={styles["link"]}>
                  {data.doc.username}
                </span>
              </Link>
            )}
            <div>
              {Object.keys(data.doc.wallet).map((currency) => {
                return (
                  <Currency
                    key={currency}
                    name={currency as TCurrencies}
                    amount={data.doc.wallet[currency as TCurrencies]}
                  />
                );
              })}
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
