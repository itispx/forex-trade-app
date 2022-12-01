import React, { useState } from "react";
import styles from "./ExchangeRateInfo.module.scss";

import queryClient from "../../utilities/queryClient";

import { toast } from "react-toastify";

import BuyModal from "../Modals/BuyModal";

import { IUserServerResponse, IExchangeConversion } from "interfaces-common";

const ExchangeRateInfo: React.FC<{ exchangeInfo: IExchangeConversion }> = ({
  exchangeInfo,
}) => {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const buyHandler = async () => {
    const data = (await queryClient.getQueryData("user")) as
      | IUserServerResponse
      | undefined;

    if (!data || !data.token || !data.doc || !data.token) {
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
            <span className={styles["currency-type"]}>{exchangeInfo.base}</span>
            <span className={styles["currency-value"]}>1</span>
          </div>
          <span className={styles["equal-sign"]}>=</span>
          <div className={styles["currency-container"]}>
            <span className={styles["currency-type"]}>{exchangeInfo.converted}</span>
            <span className={styles["currency-value"]}>{exchangeInfo.exchangeRate}</span>
          </div>
        </div>

        <div className={styles["buy-button-container"]} onClick={() => buyHandler()}>
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
