import { ErrorRequestHandler } from "express";

import APIError from "../util/errors/APIError";

// "_next" needs to be there for express to know this is a error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APIErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof APIError) {
    if (typeof error.status.code === "number") {
      return res.status(error.status.code).json(error);
    } else {
      return res.status(500).json(error);
    }
  }

  const internalError = APIError.internal();

  return res.status(internalError.status.code as number).json(internalError);
};

export default APIErrorHandler;
