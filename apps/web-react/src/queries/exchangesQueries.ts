import http from "./http-common";

import { IExchange, IQuery } from "interfaces-common";

import { QueryFunctionContext } from "react-query";

import { IExchangeInfo } from "interfaces-common";

export const performExchangeQuery = async ({
  base,
  convert,
}: IExchangeInfo): Promise<IQuery & { success: { doc: IExchange } }> => {
  const request = await http();

  const { data } = await request.post("/exchanges", { base, convert });

  return data;
};

export const getExchangesQuery = async ({
  queryKey,
}: QueryFunctionContext<[string, number]>): Promise<
  IQuery & { success: { docs: IExchange[] } }
> => {
  const [_, page] = queryKey;

  const request = await http();

  const { data } = await request.get("/exchanges", { params: { page } });

  return data;
};
