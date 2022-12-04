import { RequestHandler } from "express";

import APIError from "../util/errors/APIError";

import jwt from "jsonwebtoken";

const checkToken: RequestHandler<unknown, unknown, unknown, unknown> = (
  req,
  res,
  next,
) => {
  try {
    if (!req.headers.authorization) {
      throw APIError.unauthorizedRequest();
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY as string);

    if (typeof decoded !== "string") {
      req.accessTokenID = decoded.userID;
    }

    next();
  } catch (error) {
    throw APIError.unauthorizedRequest();
  }
};

export default checkToken;
