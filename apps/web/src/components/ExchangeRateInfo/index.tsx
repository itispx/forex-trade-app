import React, { useState } from "react";
import styles from "./ExchangeRateInfo.module.scss";

import { useTranslation } from "next-i18next";

import useUserQueryData from "../../queries/hooks/useUserQueryData";

import { toast } from "react-toastify";

import BuyModal from "../Modals/BuyModal";

import { IExchangeConversion } from "interfaces-common";

export interface Props {
  exchangeInfo: IExchangeConversion;
}

const ExchangeRateInfo: React.FC<Props> = ({ exchangeInfo }) => {
  const { t: tCommon } = useTranslation("common");
  const { t: tToast } = useTranslation("toast");

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const buyHandler = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = useUserQueryData();

    if (!data || !data.token || !data.doc) {
      toast.error(tToast("not_signed_in"));
    } else if (!data.doc.wallet || data.doc.wallet[exchangeInfo.base] <= 0) {
      toast.error(tToast("insufficient_money"));
    } else {
      openModal();
    }
  };

  return (
    <>
      <div data-testid="exchange-rate-info" className={styles["container"]}>
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
            <h1 className={styles["buy-title"]}>{tCommon("buy").toUpperCase()}</h1>
          </div>
        </div>
      </div>

      <BuyModal show={showModal} close={closeModal} exchangeInfo={exchangeInfo} />
    </>
  );
};
export default ExchangeRateInfo;
