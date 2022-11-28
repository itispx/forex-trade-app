import { ObjectId } from "mongoose";

import TCurrencies from "./CurrenciesTypes";

interface IExchange {
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

export default IExchange;
