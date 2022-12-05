import React from "react";
import styles from "./Currency.module.scss";

import { TCurrencies } from "interfaces-common";

interface Props {
  name: TCurrencies;
  amount: number;
}

const Currency: React.FC<Props> = ({ name, amount }) => {
  return (
    <span className={styles["container"]}>
      {name}: {amount}
    </span>
  );
};

export default Currency;
