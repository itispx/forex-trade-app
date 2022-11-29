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

  console.log(1);

  if (!data) {
    throw APIError.unauthorizedRequest();
  }

  console.log(2);

  const correctPassword = await bcrypt.compare(password, data.password);

  console.log(3, correctPassword);

  if (correctPassword) {
    console.log(4);
    const token = jwt.sign(
      { userID: data._id, username: data.username },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1h",
      },
    );

    console.log(5);

    return { status: { code: 200, ok: true }, success: { doc: data, token } };
  }

  console.log(6);

  throw APIError.unauthorizedRequest();
};
