import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ExchangesPage.module.scss";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { getExchangesQuery } from "../../queries/exchangesQueries";

import useUserQueryData from "../../queries/hooks/useUserQueryData";

import Loading from "../../components/Loading";
import Exchange from "../../components/Exchange";

import { IExchange } from "interfaces-common";

const ExchangesPage: React.FC = () => {
  const navigate = useNavigate();

  const userQueryData = useUserQueryData();

  useEffect(() => {
    if (!userQueryData) {
      navigate("/");
    }
  }, []);

  const page = useRef(0);
  const hasMore = useRef(true);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IExchange[]>([]);
  const [refetch, setRefetch] = useState(false);

  const getExchangesHandler = async () => {
    try {
      setIsLoading(true);

      const { status, success } = await getExchangesQuery(page.current);

      if (status.ok) {
        if (success.docs.length < 5 && hasMore.current) {
          hasMore.current = false;
        }

        for (let i = 0; i < success.docs.length; i++) {
          setData((prev) => [...prev, success.docs[i]]);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExchangesHandler();
  }, [refetch]);

  const observer = useRef<IntersectionObserver | null>();
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore.current) {
          if (!isLoading) {
            page.current = page.current + 1;
            setRefetch((prev) => !prev);
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading],
  );

  return (
    <div data-testid="exchanges-page" className={styles["page-container"]}>
      {data.map((exchange, index) => {
        return (
          <Exchange
            innerRef={data.length === index + 1 ? lastItemRef : null}
            key={exchange._id.toString()}
            base={exchange.base}
            converted={exchange.converted}
            createdAt={exchange.createdAt}
          />
        );
      })}
      {isLoading && (
        <div className={styles["loading-container"]}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ExchangesPage;
