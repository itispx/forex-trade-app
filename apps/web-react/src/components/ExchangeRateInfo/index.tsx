import React, { useState } from "react";
import styles from "./ExchangeRateInfo.module.scss";

import useUserQueryData from "../../queries/hooks/useUserQueryData";

import { toast } from "react-toastify";

import BuyModal from "../Modals/BuyModal";

import { IExchangeConversion } from "interfaces-common";

export interface Props {
  exchangeInfo: IExchangeConversion;
}

const ExchangeRateInfo: React.FC<Props> = ({ exchangeInfo }) => {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function getBitches() {
    return;
  }

  const buyHandler = async () => {
    const data = useUserQueryData();

    if (!data || !data.token || !data.doc) {
      toast.error("User not signed in");
    } else if (data.doc.wallet[exchangeInfo.base] <= 0) {
      toast.error("You don't have enough money");
    } else {
      openModal();
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["data-container"]}>
          <div className={styles["currency-container"]}>
            <span data-testid="base-currency" className={styles["currency-type"]}>
              {exchangeInfo.base}
            </span>
            <span data-testid="base-amount" className={styles["currency-value"]}>
              1
            </span>
          </div>
          <span className={styles["equal-sign"]}>=</span>
          <div className={styles["currency-container"]}>
            <span data-testid="converted-currency" className={styles["currency-type"]}>
              {exchangeInfo.converted}
            </span>
            <span data-testid="converted-amount" className={styles["currency-value"]}>
              {exchangeInfo.exchangeRate}
            </span>
          </div>
        </div>

        <div
          data-testid="buy-button-container"
          className={styles["buy-button-container"]}
          onClick={buyHandler}
        >
          <div className={styles["buy-button"]}>
            <h1>BUY</h1>
          </div>
        </div>
      </div>

      <BuyModal show={showModal} close={closeModal} exchangeInfo={exchangeInfo} />
    </>
  );
};
export default ExchangeRateInfo;
