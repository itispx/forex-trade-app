import React, { useState } from "react";
import styles from "./DashboardPage.module.scss";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001/v1/exchanges");

import ExchangeRateInfo from "../../components/ExchangeRateInfo";

import { IExchangeConversion } from "interfaces-common";

const DashboardPage: React.FC = () => {
  const [rates, setRates] = useState<IExchangeConversion[]>([]);

  socket.on("get-forex-data", (data: IExchangeConversion[]) => {
    setRates(data);
  });

  return (
    <div className={styles["page-container"]}>
      {rates.map((rate, index) => {
        return (
          <ExchangeRateInfo
            key={index}
            base={rate.base}
            converted={rate.converted}
            exchangeRate={rate.exchangeRate}
          />
        );
      })}
    </div>
  );
};

export default DashboardPage;
