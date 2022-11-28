import { RequestHandler } from "express";

import { signUpAction } from "../actions/usersActions";

export const signUpController: RequestHandler<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string },
  Record<string, unknown>
> = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { status, success } = await signUpAction(username, password);

    res.status(status.code).json({ status, success });
  } catch (error) {
    return next(error);
  }
};
