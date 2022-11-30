import { ObjectId, Document } from "mongoose";

interface UserInterface {
  _id: ObjectId;
  username: string;
  password: string;
  wallet: {
    USD: number;
    GBP: number;
  };
  createdAt: string;
}

export default UserInterface;

export interface UserDocumentInterface
  extends UserInterface,
    Document<unknown, unknown, UserInterface>,
    Required<{
      _id: ObjectId;
    }> {
  _id: ObjectId;
}

export interface UserServerResponseInterface {
  doc: UserInterface;
  token: string;
}
