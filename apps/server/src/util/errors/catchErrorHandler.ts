import { Prisma } from "@prisma/client";

import APIError from "./APIError";

const catchErrorHandler = async (error: Error) => {
  console.log("error:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new APIError(error.code, error.message);
  }
  throw new Error();
};

export default catchErrorHandler;
