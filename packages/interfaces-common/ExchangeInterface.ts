import { ObjectId, Document } from "mongoose";

import TCurrencies from "./CurrenciesTypes";

interface ExchangeInterface {
  _id: ObjectId;
  userID: ObjectId;
  base: CurrencyInfoInterface;
  converted: CurrencyInfoInterface;
  createdAt: string;
}

export default ExchangeInterface;

export interface ExchangeDocumentInterface
  extends ExchangeInterface,
    Document<unknown, unknown, ExchangeInterface>,
    Required<{
      _id: ObjectId;
    }> {
  _id: ObjectId;
}

export interface ExchangeConversionInterface {
  base: TCurrencies;
  converted: TCurrencies;
  exchangeRate: number;
}

export interface ExchangeInfoInterface {
  base: CurrencyInfoInterface;
  convert: CurrencyInfoInterface;
}

export interface CurrencyInfoInterface {
  currency: TCurrencies;
  amount: number;
}

export const CurrencyOptions: TCurrencies[] = ["USD", "GBP"];
