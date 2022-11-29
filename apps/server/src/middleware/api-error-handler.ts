import { ErrorRequestHandler } from "express";

import APIError from "../util/errors/APIError";

const APIErrorHandler: ErrorRequestHandler = (error, req, res) => {
  if (error instanceof APIError) {
    return res.status(error.status.code).json(error);
  }

  const internalError = APIError.internal();

  return res.status(internalError.status.code).json(internalError);
};

export default APIErrorHandler;
