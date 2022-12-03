import { RequestHandler } from "express";

import APIError from "../util/errors/APIError";

import { makeExchangeAction, getExchangesAction } from "../actions/exchangesActions";

import { TCurrencies } from "interfaces-common";

export const makeExchangeController: RequestHandler<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    base: { currency: TCurrencies; amount: number };
    convert: { currency: TCurrencies; amount: number };
  },
  Record<string, unknown>
> = async (req, res, next) => {
  try {
    const { base, convert } = req.body;

    if (req.accessTokenID) {
      const { status, success } = await makeExchangeAction(
        req.accessTokenID,
        base,
        convert,
      );

      return res.status(status.code).json({ status, success });
    }

    throw APIError.unauthorizedRequest();
  } catch (error) {
    return next(error);
  }
};

export const getExchangesController: RequestHandler<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  { page: number }
> = async (req, res, next) => {
  try {
    const { page } = req.query;

    if (req.accessTokenID) {
      const { status, success } = await getExchangesAction(req.accessTokenID, page);

      return res.status(status.code).json({ status, success });
    }

    throw APIError.unauthorizedRequest();
  } catch (error) {
    return next(error);
  }
};
