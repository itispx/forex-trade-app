import React from "react";
import styles from "./Currency.module.scss";

interface Props {
  symbol: string;
  name: string;
  amount: number;
}

const Currency: React.FC<Props> = ({ symbol, name, amount }) => {
  return (
    <span className={styles["container"]}>
      {symbol}
      {name}: {amount}
    </span>
  );
};

export default Currency;
