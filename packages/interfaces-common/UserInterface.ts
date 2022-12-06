import { Document, Types } from "mongoose";

import TCurrencies from "./CurrenciesTypes";

interface UserInterface {
  _id: Types.ObjectId;
  username: string;
  password: string;
  wallet: {
    [x in TCurrencies]: number;
    // USD: number;
    // GBP: number;
  };
  createdAt: string;
}

export default UserInterface;

export interface UserDocumentInterface
  extends UserInterface,
    Document<unknown, unknown, UserInterface>,
    Required<{
      _id: Types.ObjectId;
    }> {
  _id: Types.ObjectId;
}

export interface UserServerResponseInterface {
  doc: UserInterface;
  token: string;
}
