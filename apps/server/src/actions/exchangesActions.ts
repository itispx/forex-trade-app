import { Namespace } from "socket.io";

import APIError from "../util/errors/APIError";

import {
  getCurrentExchangeValues,
  addExchangeQuery,
  updateExchangeStatusQuery,
  getExchangesQuery,
} from "../queries/exchangesQueries";

import {
  getUserAction,
  addBalanceAction,
  removeBalanceAction,
} from "../actions/usersActions";

import { createExchangesMessageChannel } from "../messages/messageChannel";

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

export const addExchangeQueueAction = async (
  userID: string,
  base: { currency: TCurrencies; amount: number },
  convert: { currency: TCurrencies; amount: number },
): Promise<IQuery & { success: { doc: IExchange } }> => {
  const messageChannel = await createExchangesMessageChannel();

  if (messageChannel) {
    // Add exchange to database with "PENDING" status
    const { status, data } = await addExchangeQuery(userID, base, convert);

    // Add exchange to message channel
    const dataJson = JSON.stringify(data);
    messageChannel.sendToQueue("exchanges", Buffer.from(dataJson));

    return { status, success: { doc: data } };
  }

  throw APIError.internal();
};

export const processExchangeAction = async (
  exchange: IExchange,
): Promise<IQuery & { success: { doc: IExchange } }> => {
  try {
    // Check if user has enough credit to perform exchange
    const { success } = await getUserAction(exchange.userID);

    if (success.doc && success.doc.wallet) {
      // User credit is insufficient to perform exchange
      if (success.doc.wallet[exchange.base.currency] < exchange.base.amount) {
        throw new APIError(403, "Insufficient money");
      }
    }

    // Remove balance from user wallet
    await removeBalanceAction(
      exchange.userID,
      exchange.base.currency,
      exchange.base.amount,
    );

    // Add balance from user wallet
    await addBalanceAction(
      exchange.userID,
      exchange.converted.currency,
      exchange.converted.amount,
    );

    // Update exchange status to "SUCCESSFUL"
    const { status, data } = await updateExchangeStatusQuery(exchange.id, "SUCCESSFUL");

    return { status, success: { doc: data } };
  } catch (error) {
    //  If error is thrown update exchange status to "FAILED"
    await updateExchangeStatusQuery(exchange.id, "FAILED");

    if (error instanceof APIError) {
      throw new APIError(error.code, error.message);
    }

    throw new Error("Something went wrong processing the exchange");
  }
};

export const getExchangesAction = async (
  userID: string,
  page: number,
): Promise<IQuery & { success: { docs: IExchange[] } }> => {
  const { status, data } = await getExchangesQuery(userID, page);

  return { status, success: { docs: data } };
};
