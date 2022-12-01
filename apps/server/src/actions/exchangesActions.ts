import { Namespace } from "socket.io";

import { getCurrentExchangeValues } from "../queries/exchangesQueries";

import { IExchangeConversion } from "interfaces-common";

export const getRealTimeExchangeValuesAction = async (io: Namespace): Promise<void> => {
  const rates: IExchangeConversion[] = [];

  const usd2gbp = await getCurrentExchangeValues("USD", "GBP");
  rates.push(usd2gbp.data);

  const gbp2usd = await getCurrentExchangeValues("GBP", "USD");
  rates.push(gbp2usd.data);

  io.emit("get-forex-data", rates);
};
