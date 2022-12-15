import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";
import styles from "./MainNavigation.module.scss";

import useFetchUser from "../../queries/hooks/useFetchUser";

import SignInButton from "../Buttons/SignInButton";
import SignUpButton from "../Buttons/SignUpButton";
import Currency from "../Currency";

import { TCurrencies } from "interfaces-common";

const MainNavigation: React.FC = () => {
  const { pathname } = useRouter();

  const { data } = useFetchUser();

  return (
    <div data-testid="main-navigation-container" className={styles["container"]}>
      <div className={styles["inner-container"]}>
        {data ? (
          <div className={styles["signed"]}>
            {pathname === "/exchanges" ? (
              <Link href="/" className={styles["route-link"]}>
                <span data-testid="link" className={styles["link"]}>
                  Home
                </span>
              </Link>
            ) : (
              <Link href="/exchanges" className={styles["route-link"]}>
                <span data-testid="link" className={styles["link"]}>
                  {data.doc.username}
                </span>
              </Link>
            )}
            <div>
              {data.doc.wallet &&
                Object.keys(data.doc.wallet).map((key) => {
                  return (
                    data.doc.wallet &&
                    typeof data.doc.wallet[key as TCurrencies] === "number" && (
                      <Currency
                        key={key}
                        name={key as TCurrencies}
                        amount={data.doc.wallet[key as TCurrencies]}
                      />
                    )
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
