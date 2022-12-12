import TCurrencies, { CurrencyInfoInterface } from "./CurrenciesTypes";

interface ExchangeInterface {
  id: string;
  userID: string;
  base: CurrencyInfoInterface;
  converted: CurrencyInfoInterface;
  createdAt: string;
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
