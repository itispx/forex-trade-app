import { Document } from "mongoose";

import bcrypt from "bcryptjs";

import { signUpQuery, getUserByUsernameQuery } from "../queries/usersQueries";

import { IUser, IQuery } from "interfaces-common";
import APIError from "../util/errors/APIError";

export const signUpAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: { doc: Document<unknown, unknown, IUser> } }> => {
  const { status } = await getUserByUsernameQuery(username);

  if (status.code === 404) {
    const hashed = await bcrypt.hash(password, 10);

    const { status, data } = await signUpQuery(username, hashed);

    return { status, success: { doc: data } };
  }

  throw APIError.conflict();
};
