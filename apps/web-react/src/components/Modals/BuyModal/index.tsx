import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./BuyModal.module.scss";

import queryClient from "../../../utilities/queryClient";
import { useMutation } from "react-query";
// import { performExchangeQuery } from "../../../queries/exchangesQueries";

import { toast } from "react-toastify";

import { FormikProps, useFormikContext } from "formik";

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
  const [isLoading] = useState(false);

  const [totalValue, setTotalValue] = useState(exchangeInfo.exchangeRate);

  // Since useRef doesn't not update the UI this is necessary to update the total value when the amount changes
  const onAmountChange = useCallback((node: FormikProps<{ amount: number }>) => {
    if (node) {
      setTotalValue(node.values.amount * exchangeInfo.exchangeRate);
    }
  }, []);

  const submitHandler = () => {
    console.log("total value:", totalValue);
  };

  return (
    <Modal
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
          <span className={styles["total-value"]}>{totalValue}</span>{" "}
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
