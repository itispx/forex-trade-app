import http from "./http-common";

import { IQuery, IUserServerResponse } from "interfaces-common";

export const signUpUserQuery = async ({
  username,
  password,
}: {
  username: string;
  password: String;
}): Promise<IQuery & { success: IUserServerResponse }> => {
  const request = await http();

  const { data } = await request.post("/users/signup", { username, password });

  return data;
};

export const signInUserQuery = async ({
  username,
  password,
}: {
  username: string;
  password: String;
}): Promise<IQuery & { success: IUserServerResponse }> => {
  const request = await http();

  const { data } = await request.post("/users/signin", { username, password });

  return data;
};
