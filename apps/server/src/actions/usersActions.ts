import APIError from "../util/errors/APIError";

import bcrypt from "bcryptjs";

import {
  signUpQuery,
  getUserByUsernameQuery,
  getUserQuery,
  addBalanceQuery,
  removeBalanceQuery,
} from "../queries/usersQueries";

import signJwt from "../util/signJwt";

import {
  IQuery,
  TCurrencies,
  IUserServerResponse,
  IUserDocument,
} from "interfaces-common";

export const signUpAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: IUserServerResponse }> => {
  const { status } = await getUserByUsernameQuery(username);

  if (status.code === 404) {
    const hashed = await bcrypt.hash(password, 10);

    const { status: signupStatus, data } = await signUpQuery(username, hashed);

    if (signupStatus.code === 201) {
      const token = signJwt(data._id, data.username);

      return { status: signupStatus, success: { doc: data, token } };
    }
  }

  throw APIError.conflict();
};

export const signInAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: IUserServerResponse }> => {
  const { data } = await getUserByUsernameQuery(username);

  if (!data) {
    throw APIError.unauthorizedRequest();
  }

  const correctPassword = await bcrypt.compare(password, data.password);

  if (correctPassword) {
    const token = signJwt(data._id, data.username);

    return { status: { code: 200, ok: true }, success: { doc: data, token } };
  }

  throw APIError.unauthorizedRequest();
};

export const getUserAction = async (
  userID: string,
): Promise<IQuery & { success: IUserServerResponse }> => {
  const { status, data } = await getUserQuery(userID);

  if (status.code === 404 || !data) {
    throw APIError.notFound();
  }

  const token = signJwt(data._id, data.username);

  return { status, success: { doc: data, token } };
};

export const addBalanceAction = async (
  userID: string,
  currency: TCurrencies,
  amount: number,
): Promise<IQuery & { success: { doc: IUserDocument } }> => {
  const { status, data } = await addBalanceQuery(userID, currency, amount);

  return { status, success: { doc: data } };
};

export const removeBalanceAction = async (
  userID: string,
  currency: TCurrencies,
  amount: number,
): Promise<IQuery & { success: { doc: IUserDocument } }> => {
  const { status, data } = await removeBalanceQuery(userID, currency, amount);

  return { status, success: { doc: data } };
};
