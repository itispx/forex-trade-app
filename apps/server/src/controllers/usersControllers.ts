import { RequestHandler } from "express";

import { signUpAction, signInAction, getUserAction } from "../actions/usersActions";

import APIError from "../util/errors/APIError";

export const signUpController: RequestHandler<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string },
  Record<string, unknown>
> = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username.length < 1 || password.length < 1) {
      throw APIError.badRequest();
    }

    const { status, success } = await signUpAction(username, password);

    return res.status(status.code).json({ status, success });
  } catch (error) {
    return next(error);
  }
};

export const signInController: RequestHandler<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string },
  Record<string, unknown>
> = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username.length < 1 || password.length < 1) {
      throw APIError.badRequest();
    }

    const { status, success } = await signInAction(username, password);

    return res.status(status.code).json({ status, success });
  } catch (error) {
    return next(error);
  }
};

export const getUserController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.accessTokenID) {
      throw APIError.unauthorizedRequest();
    }

    const { status, success } = await getUserAction(req.accessTokenID);

    return res.status(status.code).json({ status, success });
  } catch (error) {
    return next(error);
  }
};
