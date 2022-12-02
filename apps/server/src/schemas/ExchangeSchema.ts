import { Schema, model } from "mongoose";

import { IExchange, TCurrencies } from "interfaces-common";

const CurrencyOptions: TCurrencies[] = ["USD", "GBP"];

const ExchangeSchema = new Schema<IExchange>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    userID: { type: Schema.Types.ObjectId, required: true },
    base: {
      currency: { type: CurrencyOptions, required: true },
      amount: { type: Number, required: true },
    },
    converted: {
      currency: { type: CurrencyOptions, required: true },
      amount: { type: Number, required: true },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

export default model<IExchange>("Exchange", ExchangeSchema);
