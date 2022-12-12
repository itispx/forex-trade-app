import { Namespace } from "socket.io";

import APIError from "../util/errors/APIError";

import {
  getCurrentExchangeValues,
  makeExchangeQuery,
  getExchangesQuery,
} from "../queries/exchangesQueries";

import {
  getUserAction,
  addBalanceAction,
  removeBalanceAction,
} from "../actions/usersActions";

import { IQuery, TCurrencies, IExchangeConversion, IExchange } from "interfaces-common";

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
): Promise<IQuery & { success: { doc: IExchange } }> => {
  // Check if user has enough credit to perform exchange
  const { success } = await getUserAction(userID);

  if (success.doc && success.doc.wallet) {
    if (success.doc.wallet[base.currency] < base.amount) {
      throw new APIError(403, "Insufficient money");
    }
  } else {
    throw APIError.notFound();
  }

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

export const getExchangesAction = async (
  userID: string,
  page: number,
): Promise<IQuery & { success: { docs: IExchange[] } }> => {
  const { status, data } = await getExchangesQuery(userID, page);

  return { status, success: { docs: data } };
};
