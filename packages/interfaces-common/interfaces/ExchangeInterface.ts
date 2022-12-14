import TCurrencies, { CurrencyInfoInterface } from "./CurrenciesTypes";

interface ExchangeInterface {
  id: string;
  userID: string;
  base: CurrencyInfoInterface;
  converted: CurrencyInfoInterface;
  status: StatusTypes;
  createdAt: Date;
}

export default ExchangeInterface;

export interface ExchangeConversionInterface {
  base: TCurrencies;
  converted: TCurrencies;
  exchangeRate: number;
}

export interface ExchangeInfoInterface {
  base: CurrencyInfoInterface;
  convert: CurrencyInfoInterface;
}

export type StatusTypes = "FAILED" | "PENDING" | "SUCCESSFUL";
