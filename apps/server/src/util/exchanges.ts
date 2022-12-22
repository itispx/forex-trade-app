import { IExchange } from "interfaces-common";

import { Exchange } from "../../dist";

export const makeExchangeObj = (exchange: Exchange): IExchange => {
  const { baseCurrency, baseAmount, convertedCurrency, convertedAmount, ...remExchange } =
    exchange;

  const data: IExchange = {
    ...remExchange,
    base: {
      currency: baseCurrency,
      amount: baseAmount,
    },
    converted: {
      currency: convertedCurrency,
      amount: convertedAmount,
    },
  };

  return data;
};
