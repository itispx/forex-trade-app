import React from "react";
import styles from "./Exchange.module.scss";

import { TCurrencies } from "interfaces-common";

interface Props {
  base: {
    currency: TCurrencies;
    amount: number;
  };
  converted: {
    currency: TCurrencies;
    amount: number;
  };
  createdAt: string;
}

const Exchange: React.FC<Props> = ({ base, converted, createdAt }) => {
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString();

  return (
    <div className={styles["container"]}>
      <div className={styles["data-container"]}>
        <div className={styles["currency-container"]}>
          <span className={styles["currency-type"]}>{base.currency}</span>
          <span className={styles["currency-value"]}>{base.amount}</span>
        </div>
        <span className={styles["gt-sign"]}>&gt;</span>
        <div className={styles["currency-container"]}>
          <span className={styles["currency-type"]}>{converted.currency}</span>
          <span className={styles["currency-value"]}>{converted.amount}</span>
        </div>
      </div>

      <div className={styles["created-at"]}>
        {date} at {time}
      </div>
    </div>
  );
};

export default Exchange;
