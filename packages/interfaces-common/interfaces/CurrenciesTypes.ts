type CurrenciesTypes = "USD" | "GBP";

export interface CurrencyInfoInterface {
  currency: CurrenciesTypes;
  amount: number;
}

export const CurrencyOptions: CurrenciesTypes[] = ["USD", "GBP"];

export default CurrenciesTypes;
