import { Schema, model } from "mongoose";

import { IUser } from "interfaces-common";

const UserSchema = new Schema<IUser>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wallet: {
      USD: { type: Number, default: 1000 },
      GBP: { type: Number, default: 0 },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

export default model<IUser>("User", UserSchema);
