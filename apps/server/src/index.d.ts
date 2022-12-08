import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      accessTokenID: ObjectId | undefined;
    }
  }
}
