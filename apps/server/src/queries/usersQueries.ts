import { Types, Document } from "mongoose";

import catchErrorHandler from "../util/errors/catchErrorHandler";

import User from "../schemas/UserSchema";

import { IQuery, IUser } from "interfaces-common";

export const signUpQuery = async (
  username: string,
  hash: string,
): Promise<IQuery & { data: Document<unknown, unknown, IUser> }> => {
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
): Promise<
  IQuery & { data: Document<unknown, unknown, Omit<IUser, "password">> | undefined }
> => {
  try {
    const data = await User.find({ username }).select("-password");

    if (data.length <= 0) {
      return { status: { code: 404, ok: false }, data: undefined };
    }

    return { status: { code: 200, ok: true }, data: data[0] };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};
