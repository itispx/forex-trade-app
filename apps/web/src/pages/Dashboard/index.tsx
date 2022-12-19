import { NextPage, GetStaticProps } from "next";

import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import exchangesListener, { socket } from "../../queries/websockets/exchangesListener";

import ExchangeRateInfo from "../../components/ExchangeRateInfo";
import Loading from "../../components/Loading";

import { IExchangeConversion } from "interfaces-common";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "auth", "toast"])),
    },
  };
};

const DashboardPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [rates, setRates] = useState<IExchangeConversion[]>([
    { base: "USD", converted: "GBP", exchangeRate: 0.81586 },
    { base: "GBP", converted: "USD", exchangeRate: 1.2257 },
  ]);

  // const exchangesListenerHandler = (data: IExchangeConversion[]) => {
  //   setRates(data);

  //   if (isLoading) {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   exchangesListener(exchangesListenerHandler);

  //   return () => {
  //     socket.disconnect();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={styles["page-container"]}>
      {isLoading ? (
        <div className={styles["loading-container"]}>
          <Loading />
        </div>
      ) : (
        rates.map((rate, index) => {
          return <ExchangeRateInfo key={index} exchangeInfo={rate} />;
        })
      )}
    </div>
  );
};

export default DashboardPage;
