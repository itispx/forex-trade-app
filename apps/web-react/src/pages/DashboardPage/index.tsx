import React, { useState, useEffect } from "react";
import styles from "./DashboardPage.module.scss";

import { io } from "socket.io-client";

// const socket = io("http://localhost:3001/v1/exchanges");

import ExchangeRateInfo from "../../components/ExchangeRateInfo";
import Loading from "../../components/Loading";

import { IExchangeConversion } from "interfaces-common";

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [rates, setRates] = useState<IExchangeConversion[]>([
    { base: "USD", converted: "GBP", exchangeRate: 0.81586 },
    { base: "GBP", converted: "USD", exchangeRate: 1.2257 },
  ]);

  // useEffect(() => {
  //   socket.on("get-forex-data", (data: IExchangeConversion[]) => {
  //     setRates(data);

  //     if (isLoading) {
  //       setIsLoading(false);
  //     }
  //   });
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
