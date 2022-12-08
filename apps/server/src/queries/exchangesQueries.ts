import axios from "axios";

import { ObjectId, Types } from "mongoose";

import APIError from "../util/errors/APIError";
import catchErrorHandler from "../util/errors/catchErrorHandler";

import Exchange from "../schemas/ExchangeSchema";

import {
  IQuery,
  TCurrencies,
  IExchangeConversion,
  IExchangeDocument,
  ICurrencyInfo,
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

export const makeExchangeQuery = async (
  userID: ObjectId,
  base: ICurrencyInfo,
  convert: ICurrencyInfo,
): Promise<IQuery & { data: IExchangeDocument }> => {
  try {
    const data = await Exchange.create({
      _id: new Types.ObjectId(),
      userID,
      base,
      converted: convert,
    });

    return { status: { code: 201, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const getExchangesQuery = async (
  userID: ObjectId,
  page: number,
): Promise<IQuery & { data: IExchangeDocument[] }> => {
  try {
    const limit = 5;

    const data = await Exchange.find({ userID })
      .skip(page * limit)
      .limit(limit)
      .sort("-createdAt");

    return { status: { code: 200, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};
