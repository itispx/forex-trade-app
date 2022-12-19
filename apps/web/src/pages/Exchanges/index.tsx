// Eslint will complain if you don't use key or if you do use key
/* eslint-disable react/jsx-key */
import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import styles from "./Exchanges.module.scss";

import { toast } from "react-toastify";

import { useTable, Column } from "react-table";

import { getExchangesQuery } from "../../queries/exchangesQueries";

import useUserQueryData from "../../queries/hooks/useUserQueryData";

import Loading from "../../components/Loading";

import { TStatus } from "interfaces-common";

interface IParsedExchange {
  id: string;
  userID: string;
  currency: string;
  base: string;
  converted: string;
  status: TStatus;
  date: string;
  time: string;
}

const ExchangesPage: NextPage = () => {
  const { push } = useRouter();

  const userQueryData = useUserQueryData();

  useEffect(() => {
    if (!userQueryData) {
      push("/");
    }
  }, [userQueryData, push]);

  const page = useRef(0);
  const hasMore = useRef(true);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IParsedExchange[]>([]);
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
          const exchange = success.docs[i];

          const parsedExchange: IParsedExchange = {
            id: exchange.id,
            userID: exchange.userID,
            currency: `${exchange.base.currency}/${exchange.converted.currency}`,
            base: exchange.base.amount.toFixed(3),
            converted: exchange.converted.amount.toFixed(3),
            status: exchange.status,
            date: new Date(exchange.createdAt).toLocaleDateString(),
            time: new Date(exchange.createdAt).toLocaleTimeString(),
          };

          setData((prev) => [...prev, parsedExchange]);
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

  const exchangesData = useMemo(() => [...data], [data]);

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ value }) => <span className={styles["id-field"]}>{value}</span>,
      },
      { Header: "Currency", accessor: "currency" },
      { Header: "Base", accessor: "base" },
      { Header: "Converted", accessor: "converted" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={`${styles["status-field"]} ${styles[value.toLowerCase()]}`}>
            {value}
          </span>
        ),
      },
      { Header: "Date", accessor: "date" },
      { Header: "Time", accessor: "time" },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: exchangesData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const observer = useRef<IntersectionObserver | null>();
  const lastItemRef = useCallback(
    (node: HTMLTableRowElement) => {
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  data-testid={`table-header-cell-${column.Header?.toString()}`}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                ref={data.length === index + 1 ? lastItemRef : null}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    data-testid={`table-data-cell-${cell.value}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {isLoading ? <Loading /> : null}
    </div>
  );
};

export default ExchangesPage;
