import { Types, Document } from "mongoose";

import catchErrorHandler from "../util/errors/catchErrorHandler";

import User from "../schemas/UserSchema";

import { IQuery, IUser } from "interfaces-common";

export const signUpQuery = async (
  username: string,
  hash: string,
): Promise<IQuery & { data: Document<unknown, unknown, IUser> }> => {
  try {
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
