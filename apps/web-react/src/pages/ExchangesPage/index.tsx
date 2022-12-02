import React, { useState } from "react";
import styles from "./Exchanges.module.scss";

import { useQuery } from "react-query";
import { getExchangesQuery } from "../../queries/exchangesQueries";

import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import Exchange from "../../components/Exchange";

import { IExchange } from "interfaces-common";

const ExchangesPage: React.FC = () => {
  const [exchanges, setExchange] = useState<IExchange[]>([]);

  const { isLoading } = useQuery("exchanges", getExchangesQuery, {
    onSuccess: (data) => {
      if (data.status.code === 200) {
        for (let i = 0; i < data.success.docs.length; i++) {
          setExchange((prev) => [...prev, data.success.docs[i]]);
        }
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className={styles["page-container"]}>
      {isLoading ? (
        <div className={styles["loading-container"]}>
          <Loading />
        </div>
      ) : (
        exchanges.map((exchange) => {
          return (
            <Exchange
              key={exchange._id.toString()}
              base={exchange.base}
              converted={exchange.converted}
              createdAt={exchange.createdAt}
            />
          );
        })
      )}
    </div>
  );
};

export default ExchangesPage;
