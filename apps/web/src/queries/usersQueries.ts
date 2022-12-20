import http from "./http-common";

import { IQuery, IUserServerResponse } from "interfaces-common";
import getUserToken from "../utilities/getUserToken";

export const signUpUserQuery = async ({
  username,
  password,
}: {
  username: string;
  password: String;
}): Promise<IQuery & IUserServerResponse> => {
  const request = await http();

  const { data } = await request.post("/users/signup", { username, password });

  return { status: data.status, ...data.success };
};

export const signInUserQuery = async ({
  username,
  password,
}: {
  username: string;
  password: String;
}): Promise<IQuery & IUserServerResponse> => {
  const request = await http();

  const { data } = await request.post("/users/signin", { username, password });

  return { status: data.status, ...data.success };
};

export const getUserQuery = async (): Promise<
  (IQuery & IUserServerResponse) | undefined
> => {
  const token = getUserToken();

  if (token) {
    const request = await http();

    const { data } = await request.get("/users");

    return { status: data.status, ...data.success };
  }

  return undefined;
};
