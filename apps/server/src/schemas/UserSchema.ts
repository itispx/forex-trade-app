import { Schema, model } from "mongoose";

import { IUser } from "interfaces-common";

export const DEFAULT_WALLET_AMOUNT = 1000;

const UserSchema = new Schema<IUser>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    wallet: {
      USD: { type: Number, default: DEFAULT_WALLET_AMOUNT },
      GBP: { type: Number, default: DEFAULT_WALLET_AMOUNT },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

export default model<IUser>("User", UserSchema);
