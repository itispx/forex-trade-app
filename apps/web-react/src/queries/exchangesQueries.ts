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

export const getExchangesQuery = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<IExchange[]> => {
  console.log("fetch next:", pageParam);

  const request = await http();

  const { data } = await request.get("/exchanges", { params: { page: pageParam } });

  return data.success.docs;
};
