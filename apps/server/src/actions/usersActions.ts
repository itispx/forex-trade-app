import { Document } from "mongoose";

import bcrypt from "bcryptjs";

import { signUpQuery } from "../queries/usersQueries";

import { IUser, IQuery } from "interfaces-common";

export const signUpAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: { doc: Document<unknown, unknown, IUser> } }> => {
  const hashed = await bcrypt.hash(password, 10);

  const { status, data } = await signUpQuery(username, hashed);

  return { status, success: { doc: data } };
};
