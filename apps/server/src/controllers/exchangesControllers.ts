import { RequestHandler } from "express";

import { makeExchangeAction } from "../actions/exchangesActions";

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
      await makeExchangeAction(req.accessTokenID, base, convert);
    }

    res.status(200).json({ message: "i got here" });
  } catch (error) {
    return next(error);
  }
};
