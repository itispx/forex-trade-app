import { Prisma } from "../../../dist";

import APIError from "./APIError";

const catchErrorHandler = async (error: Error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new APIError(error.code, error.message);
  }
  throw new Error();
};

export default catchErrorHandler;
