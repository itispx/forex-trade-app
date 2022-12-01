import axios from "axios";

import APIError from "../util/errors/APIError";
import catchErrorHandler from "../util/errors/catchErrorHandler";

import { IQuery, TCurrencies, IExchangeConversion } from "interfaces-common";

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
