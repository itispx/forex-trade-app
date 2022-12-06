import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Exchanges.module.scss";

import { useQuery } from "react-query";
import { getExchangesQuery } from "../../queries/exchangesQueries";

import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import Exchange from "../../components/Exchange";

const ExchangesPage: React.FC = () => {
  const page = useRef(0);
  const hasMore = useRef(true);

  const { data, isLoading, refetch } = useQuery(
    ["exchanges", page.current],
    getExchangesQuery,
    {
      select: (data) => {
        console.log("docs length:", data.success.docs.length);
        if (data.success.docs.length < 5) {
          console.log("i am settings hasMore to false");
          hasMore.current = false;
        }

        return data;
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  const observer = useRef<IntersectionObserver | null>();
  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        page.current = page.current + 1;
        console.log("refetch");
        refetch();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, []);

  return (
    <div className={styles["page-container"]}>
      {isLoading ? (
        <div className={styles["loading-container"]}>
          <Loading />
        </div>
      ) : (
        data?.success.docs.map((exchange, index) => {
          return (
            <Exchange
              innerRef={data.success.docs.length === index + 1 ? lastItemRef : null}
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
