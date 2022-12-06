import React, { useState, useCallback } from "react";
import styles from "./BuyModal.module.scss";

import usePostExchange from "../../../queries/usePostExchange";

import { FormikProps } from "formik";

import Modal from "react-modal";

import BuyForm from "../../Forms/BuyForm";

import { IExchangeConversion } from "interfaces-common";

Modal.setAppElement("body");

interface Props {
  show: boolean;
  close: () => void;
  exchangeInfo: IExchangeConversion;
}

const BuyModal: React.FC<Props> = ({ show, close, exchangeInfo }) => {
  const { mutate: performExchange, isLoading } = usePostExchange();

  const [amount, setAmount] = useState(1);

  // Since useRef doesn't not update the UI this is necessary to update the total value when the amount changes
  const onAmountChange = useCallback((node: FormikProps<{ amount: number }>) => {
    if (node) {
      setAmount(node.values.amount);
    }
  }, []);

  const submitHandler = () => {
    performExchange({
      base: { currency: exchangeInfo.base, amount: amount },
      convert: {
        currency: exchangeInfo.converted,
        amount: amount * exchangeInfo.exchangeRate,
      },
    });
  };

  return (
    <Modal
      id="buy-modal"
      testId="buy-modal"
      isOpen={show}
      onRequestClose={close}
      contentLabel="BuyModal"
      className={styles["modal"]}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Buy</h1>

        <div className={styles["display-converted-container"]}>
          <span className={styles["currencies"]}>
            {exchangeInfo.base} &gt; {exchangeInfo.converted} =
          </span>
          <span className={styles["total-value"]}>
            {amount * exchangeInfo.exchangeRate}
          </span>
        </div>

        <BuyForm
          isLoading={isLoading}
          submitHandler={submitHandler}
          inputRef={onAmountChange}
        />
      </div>
    </Modal>
  );
};

export default BuyModal;
