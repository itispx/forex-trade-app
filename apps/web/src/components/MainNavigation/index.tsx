import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import React from "react";
import styles from "./MainNavigation.module.scss";

import useFetchUser from "../../queries/hooks/useFetchUser";

import SignInButton from "../Buttons/SignInButton";
import SignUpButton from "../Buttons/SignUpButton";
import Currency from "../Currency";

import { TCurrencies } from "interfaces-common";

const MainNavigation: React.FC = () => {
  const { t } = useTranslation("common");

  const { pathname } = useRouter();

  const { data } = useFetchUser();

  return (
    <div data-testid="main-navigation-container" className={styles["container"]}>
      <div className={styles["inner-container"]}>
        {data ? (
          <div className={styles["signed"]}>
            {pathname === "/Exchanges" ? (
              <Link href="/Dashboard" className={styles["route-link"]}>
                <span data-testid="link" className={styles["link"]}>
                  {t("dashboard")}
                </span>
              </Link>
            ) : (
              <Link href="/Exchanges" className={styles["route-link"]}>
                <span data-testid="link" className={styles["link"]}>
                  {t("view_exchanges")}
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
