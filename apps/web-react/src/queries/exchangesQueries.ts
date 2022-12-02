import http from "./http-common";

import { IQuery, TCurrencies } from "interfaces-common";

export const performExchangeQuery = async ({
  base,
  convert,
}: {
  base: { currency: TCurrencies; amount: number };
  convert: { currency: TCurrencies; amount: number };
}): Promise<IQuery & { success: any }> => {
  const request = await http();

  const { data } = await request.post("/exchanges", { base, convert });

  return data;
};
