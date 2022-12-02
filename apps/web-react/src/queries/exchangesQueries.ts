import http from "./http-common";

import { IExchange, IQuery, TCurrencies } from "interfaces-common";

export const performExchangeQuery = async ({
  base,
  convert,
}: {
  base: { currency: TCurrencies; amount: number };
  convert: { currency: TCurrencies; amount: number };
}): Promise<IQuery & { success: { doc: IExchange } }> => {
  const request = await http();

  const { data } = await request.post("/exchanges", { base, convert });

  return data;
};

export const getExchangesQuery = async (): Promise<
  IQuery & { success: { docs: IExchange[] } }
> => {
  const request = await http();

  const { data } = await request.get("/exchanges");

  return data;
};
