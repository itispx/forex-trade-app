import { Schema, model } from "mongoose";

import { IExchange, OCurrency } from "interfaces-common";

const ExchangeSchema = new Schema<IExchange>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    userID: { type: Schema.Types.ObjectId, required: true },
    base: {
      currency: { type: String, enum: OCurrency, required: true },
      amount: { type: Number, required: true },
    },
    converted: {
      currency: { type: String, enum: OCurrency, required: true },
      amount: { type: Number, required: true },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

export default model<IExchange>("Exchange", ExchangeSchema);
