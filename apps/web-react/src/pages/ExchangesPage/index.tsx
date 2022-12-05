import React, { useState, useRef } from "react";
import styles from "./Exchanges.module.scss";

import { useQuery } from "react-query";
import { getExchangesQuery } from "../../queries/exchangesQueries";

import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import Exchange from "../../components/Exchange";

const ExchangesPage: React.FC = () => {
  const page = useRef(0);

  const { data, isLoading, refetch } = useQuery(
    ["exchanges", page.current],
    getExchangesQuery,
    {
      onError: () => {
        toast.error("Something went wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className={styles["page-container"]}>
      {isLoading ? (
        <div className={styles["loading-container"]}>
          <Loading />
        </div>
      ) : (
        data?.success.docs.map((exchange) => {
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
