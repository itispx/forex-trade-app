import axios from "axios";

import APIError from "../util/errors/APIError";
import catchErrorHandler from "../util/errors/catchErrorHandler";

import prisma from "../util/prisma/client";

import { makeExchangeObj } from "../util/exchanges";

import {
  IQuery,
  TCurrencies,
  IExchangeConversion,
  IExchange,
  ICurrencyInfo,
  TStatus,
} from "interfaces-common";

interface IAPIResponse {
  base: TCurrencies;
  result: { [x in TCurrencies]?: number };
  updated: string;
  ms: number;
}

export const getCurrentExchangeValues = async (
  base: TCurrencies,
  converted: TCurrencies,
): Promise<IQuery & { data: IExchangeConversion }> => {
  try {
    const { data }: { data: IAPIResponse } = await axios.get(
      `https://api.fastforex.io/fetch-one?from=${base}&to=${converted}&api_key=${process.env.FOREX_API_KEY}`,
    );

    const exchangeRate = data.result[converted];

    if (typeof exchangeRate === "number") {
      return {
        status: { code: 200, ok: true },
        data: {
          base: data.base,
          converted,
          exchangeRate,
        },
      };
    }

    throw APIError.notFound();
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const addExchangeQuery = async (
  userID: string,
  base: ICurrencyInfo,
  convert: ICurrencyInfo,
): Promise<IQuery & { data: IExchange }> => {
  try {
    const exchange = await prisma.exchange.create({
      data: {
        userID,
        baseCurrency: base.currency,
        baseAmount: base.amount,
        convertedCurrency: convert.currency,
        convertedAmount: convert.amount,
        status: "PENDING",
      },
    });

    const data = makeExchangeObj(exchange);

    return { status: { code: 201, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const updateExchangeStatusQuery = async (
  id: string,
  status: TStatus,
): Promise<IQuery & { data: IExchange }> => {
  try {
    const updatedExchange = await prisma.exchange.update({
      where: { id },
      data: { status },
    });

    const data = makeExchangeObj(updatedExchange);

    return { status: { code: 201, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const getExchangesQuery = async (
  userID: string,
  page: number,
): Promise<IQuery & { data: IExchange[] }> => {
  try {
    const limit = 5;

    const exchanges = await prisma.exchange.findMany({
      where: { userID },
      skip: page * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const exchangesArr: IExchange[] = [];

    for (let i = 0; i < exchanges.length; i++) {
      const {
        baseCurrency,
        baseAmount,
        convertedCurrency,
        convertedAmount,
        ...remExchange
      } = exchanges[0];

      exchangesArr.push({
        ...remExchange,
        base: {
          currency: baseCurrency,
          amount: baseAmount,
        },
        converted: {
          currency: convertedCurrency,
          amount: convertedAmount,
        },
      });
    }

    return { status: { code: 200, ok: true }, data: exchangesArr };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};
