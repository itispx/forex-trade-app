import React from "react";
import styles from "./ExchangeRateInfo.module.scss";

import { IExchangeConversion } from "interfaces-common";

const ExchangeRateInfo: React.FC<IExchangeConversion> = ({
  base,
  converted,
  exchangeRate,
}) => {
  function buyHandler() {
    console.log("buy");
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["data-container"]}>
        <div className={styles["currency-container"]}>
          <span className={styles["currency-type"]}>{base}</span>
          <span className={styles["currency-value"]}>1</span>
        </div>
        <span className={styles["equal-sign"]}>=</span>
        <div className={styles["currency-container"]}>
          <span className={styles["currency-type"]}>{converted}</span>
          <span className={styles["currency-value"]}>{exchangeRate}</span>
        </div>
      </div>

      <div className={styles["buy-button-container"]} onClick={() => buyHandler()}>
        <div className={styles["buy-button"]}>
          <h1>BUY</h1>
        </div>
      </div>
    </div>
  );
};
export default ExchangeRateInfo;
