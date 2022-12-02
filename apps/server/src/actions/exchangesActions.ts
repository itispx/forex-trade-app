import { Namespace } from "socket.io";

import { getCurrentExchangeValues, makeExchangeQuery } from "../queries/exchangesQueries";
import { addBalanceAction, removeBalanceAction } from "../actions/usersActions";

import {
  IQuery,
  TCurrencies,
  IExchangeConversion,
  IExchangeDocument,
} from "interfaces-common";
import APIError from "../util/errors/APIError";

export const getExchangeValuesAction = async (): Promise<IExchangeConversion[]> => {
  const rates: IExchangeConversion[] = [];

  const usd2gbp = await getCurrentExchangeValues("USD", "GBP");
  rates.push(usd2gbp.data);

  const gbp2usd = await getCurrentExchangeValues("GBP", "USD");
  rates.push(gbp2usd.data);

  return rates;
};

export const getRealTimeExchangeValuesAction = async (io: Namespace) => {
  const firstRates = await getExchangeValuesAction();
  io.emit("get-forex-data", firstRates);

  setInterval(async () => {
    const rates = await getExchangeValuesAction();
    io.emit("get-forex-data", rates);
  }, 30000);
};

export const makeExchangeAction = async (
  userID: string,
  base: { currency: TCurrencies; amount: number },
  convert: { currency: TCurrencies; amount: number },
): Promise<IQuery & { success: { doc: IExchangeDocument } }> => {
  // Create exchange document
  const { status, data } = await makeExchangeQuery(userID, base, convert);

  if (status.code === 201) {
    // Remove balance from user document
    await removeBalanceAction(userID, base.currency, base.amount);

    // Add balance from user document
    await addBalanceAction(userID, convert.currency, convert.amount);

    return { status, success: { doc: data } };
  }

  throw APIError.internal();
};
