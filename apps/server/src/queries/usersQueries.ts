import { Types } from "mongoose";

import catchErrorHandler from "../util/errors/catchErrorHandler";

import User from "../schemas/UserSchema";

import { IQuery, IUserDocument, TCurrencies } from "interfaces-common";
import APIError from "../util/errors/APIError";

export const signUpQuery = async (
  username: string,
  hash: string,
): Promise<IQuery & { data: IUserDocument }> => {
  try {
    // TODO Remove password before returning to the user
    const data = await User.create({
      _id: new Types.ObjectId(),
      username: username,
      password: hash,
    });

    return { status: { code: 201, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const getUserByUsernameQuery = async (
  username: string,
): Promise<IQuery & { data: IUserDocument | undefined }> => {
  try {
    const data = await User.find({ username });

    if (data.length <= 0) {
      return { status: { code: 404, ok: false }, data: undefined };
    }

    return { status: { code: 200, ok: true }, data: data[0] };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const addBalanceQuery = async (
  userID: string,
  currency: TCurrencies,
  amount: number,
): Promise<IQuery & { data: IUserDocument }> => {
  try {
    const user = await User.findById(userID);

    if (user) {
      user.wallet[currency] += amount;

      user.save();

      return { status: { code: 201, ok: true }, data: user };
    }

    throw APIError.notFound();
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const removeBalanceQuery = async (
  userID: string,
  currency: TCurrencies,
  amount: number,
): Promise<IQuery & { data: IUserDocument }> => {
  try {
    const user = await User.findById(userID);

    if (user) {
      user.wallet[currency] -= amount;

      user.save();

      return { status: { code: 201, ok: true }, data: user };
    }

    throw APIError.notFound();
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};
