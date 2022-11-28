import { Document } from "mongoose";

import APIError from "../util/errors/APIError";

import { signUpQuery } from "../queries/usersQueries";

import { IUser, IQuery } from "interfaces-common";

export const signUpAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: { doc: Document<unknown, unknown, IUser> } }> => {
  // bcrypt.hash(password, 10, async (err, hash) => {
  //   if (err) {
  //     throw new APIError(500, err.message);
  //   } else {
  const { status, data } = await signUpQuery(username, password);

  return { status, success: { doc: data } };
  //   }
  // });

  throw new Error();
};
