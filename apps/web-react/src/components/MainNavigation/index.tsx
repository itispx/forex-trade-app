import React from "react";
import styles from "./MainNavigation.module.scss";

import { Link, useLocation } from "react-router-dom";

import { useQuery } from "react-query";
import { getUserQuery } from "../../queries/usersQueries";

import { toast } from "react-toastify";

import SignInButton from "../Buttons/SignInButton";
import SignUpButton from "../Buttons/SignUpButton";
import Currency from "../Currency";

const MainNavigation: React.FC = () => {
  const { pathname } = useLocation();

  const { data } = useQuery("user", getUserQuery, {
    select: (data) => {
      if (data && data.status.ok) {
        return data;
      }

      toast.error("Something went wrong");
    },
    refetchOnWindowFocus: false,
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
