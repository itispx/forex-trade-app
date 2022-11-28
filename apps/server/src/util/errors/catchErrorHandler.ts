import { MongoError } from "mongodb";

import APIError from "./APIError";

const catchErrorHandler = async (error: Error) => {
  if (error instanceof MongoError && typeof error.code === "number") {
    throw new APIError(error.code, error.message);
  }
  throw new Error();
};

export default catchErrorHandler;
