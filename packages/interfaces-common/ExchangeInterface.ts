import { ObjectId, Document } from "mongoose";

import TCurrencies from "./CurrenciesTypes";

interface ExchangeInterface {
  _id: ObjectId;
  userID: ObjectId;
  in: {
    currency: TCurrencies;
    amount: number;
  };
  out: {
    currency: TCurrencies;
    amount: number;
  };
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
