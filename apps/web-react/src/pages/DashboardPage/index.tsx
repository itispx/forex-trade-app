import React, { useState } from "react";
import styles from "./DashboardPage.module.scss";

import { io } from "socket.io-client";

// const socket = io("http://localhost:3001/v1/exchanges");

import ExchangeRateInfo from "../../components/ExchangeRateInfo";

import { IExchangeConversion } from "interfaces-common";

const DashboardPage: React.FC = () => {
  const [rates, setRates] = useState<IExchangeConversion[]>([
    { base: "USD", converted: "GBP", exchangeRate: 0.81586 },
    { base: "GBP", converted: "USD", exchangeRate: 1.2257 },
  ]);

  // socket.on("get-forex-data", (data: IExchangeConversion[]) => {
  //   console.log(data);

  //   setRates(data);
  // });

  return (
    <div className={styles["page-container"]}>
      {rates.map((rate, index) => {
        return <ExchangeRateInfo key={index} exchangeInfo={rate} />;
      })}
    </div>
  );
};

export default DashboardPage;
