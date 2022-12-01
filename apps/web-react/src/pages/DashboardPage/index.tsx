import React from "react";
import styles from "./DashboardPage.module.scss";

// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");

import ExchangeRateInfo from "../../components/ExchangeRateInfo";

const DashboardPage: React.FC = () => {
  //   socket.on("get-forex-data", (data) => {
  //     console.log(data);
  //   });

  return (
    <div className={styles["page-container"]}>
      <ExchangeRateInfo base="USD" converted="GBP" exchangeRate={1.5} />
      <ExchangeRateInfo base="GBP" converted="USD" exchangeRate={0.5} />
    </div>
  );
};

export default DashboardPage;
