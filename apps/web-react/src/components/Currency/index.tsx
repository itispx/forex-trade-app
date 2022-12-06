import React from "react";
import styles from "./Currency.module.scss";

import { TCurrencies } from "interfaces-common";

interface Props {
  name: TCurrencies;
  amount: number;
}

const Currency: React.FC<Props> = ({ name, amount }) => {
  return (
    <span data-testid="currency-display" className={styles["container"]}>
      {name}: {amount.toFixed(3)}
    </span>
  );
};

export default Currency;
