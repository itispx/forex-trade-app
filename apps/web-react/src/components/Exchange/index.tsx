import React from "react";
import styles from "./Exchange.module.scss";

import { ICurrencyInfo } from "interfaces-common";

export interface Props {
  base: ICurrencyInfo;
  converted: ICurrencyInfo;
  createdAt: string;
  innerRef?: React.Ref<HTMLDivElement>;
}

const Exchange: React.FC<Props> = ({ base, converted, createdAt, innerRef }) => {
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString();

  return (
    <div className={styles["container"]} ref={innerRef}>
      <div className={styles["data-container"]}>
        <div className={styles["currency-container"]}>
          <span data-testid="base-currency" className={styles["currency-type"]}>
            {base.currency}
          </span>
          <span data-testid="base-amount" className={styles["currency-value"]}>
            {base.amount}
          </span>
        </div>
        <span className={styles["gt-sign"]}>&gt;</span>
        <div className={styles["currency-container"]}>
          <span data-testid="converted-currency" className={styles["currency-type"]}>
            {converted.currency}
          </span>
          <span data-testid="converted-amount" className={styles["currency-value"]}>
            {converted.amount}
          </span>
        </div>
      </div>

      <div data-testid="created-at" className={styles["created-at"]}>
        {date} at {time}
      </div>
    </div>
  );
};

export default Exchange;
