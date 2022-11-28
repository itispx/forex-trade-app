import { RequestHandler } from "express";

import { signUpAction } from "../actions/usersActions";

import APIError from "../util/errors/APIError";

export const signUpController: RequestHandler<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string },
  Record<string, unknown>
> = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username.length <= 0 || password.length <= 0) {
      throw APIError.badRequest();
    }

    const { status, success } = await signUpAction(username, password);

    res.status(status.code).json({ status, success });
  } catch (error) {
    return next(error);
  }
};
