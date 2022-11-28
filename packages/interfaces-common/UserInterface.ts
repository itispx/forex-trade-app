import { ObjectId } from "mongoose";

interface IUser {
  _id: ObjectId;
  username: string;
  wallet: {
    USD: number;
    GBP: number;
  };
  createdAt: string;
}

export default IUser;
