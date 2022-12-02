import { Namespace } from "socket.io";

import { getCurrentExchangeValues } from "../queries/exchangesQueries";

import { IExchangeConversion } from "interfaces-common";

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

// export const makeExchangeAction = async () => {};
