import APIError from "../util/errors/APIError";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { signUpQuery, getUserByUsernameQuery } from "../queries/usersQueries";

import { IQuery, IUserDocument } from "interfaces-common";

export const signUpAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: { doc: IUserDocument } }> => {
  const { status } = await getUserByUsernameQuery(username);

  if (status.code === 404) {
    const hashed = await bcrypt.hash(password, 10);

    const { status: signupStatus, data } = await signUpQuery(username, hashed);

    return { status: signupStatus, success: { doc: data } };
  }

  throw APIError.conflict();
};

export const signInAction = async (
  username: string,
  password: string,
): Promise<IQuery & { success: { doc: IUserDocument; token: string } }> => {
  const { data } = await getUserByUsernameQuery(username);

  if (!data) {
    throw APIError.unauthorizedRequest();
  }

  const correctPassword = await bcrypt.compare(password, data.password);

  if (correctPassword) {
    const token = jwt.sign(
      { userID: data._id, username: data.username },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1h",
      },
    );

    return { status: { code: 200, ok: true }, success: { doc: data, token } };
  }

  throw APIError.unauthorizedRequest();
};
