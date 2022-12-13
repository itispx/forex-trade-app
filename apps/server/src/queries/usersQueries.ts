import APIError from "../util/errors/APIError";

import catchErrorHandler from "../util/errors/catchErrorHandler";

import prisma from "../util/prisma/client";

import { IQuery, IUser, TCurrencies } from "interfaces-common";

export const signUpQuery = async (
  username: string,
  hash: string,
): Promise<IQuery & { data: IUser }> => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hash,
        wallet: {
          create: { GBP: 1000, USD: 1000 },
        },
      },
      include: { wallet: true },
    });

    if (user.wallet) {
      return { status: { code: 201, ok: true }, data: user };
    }

    throw APIError.internal();
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const getUserByUsernameQuery = async (
  username: string,
): Promise<IQuery & { data: IUser | undefined }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { wallet: true },
    });

    if (!user) {
      return { status: { code: 404, ok: false }, data: undefined };
    }

    return { status: { code: 200, ok: true }, data: user };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const getUserQuery = async (
  userID: string,
): Promise<IQuery & { data: IUser | undefined }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userID },
      include: { wallet: true },
    });

    if (!user) {
      return { status: { code: 404, ok: false }, data: undefined };
    }

    return { status: { code: 200, ok: true }, data: user };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const addBalanceQuery = async (
  userID: string,
  currency: TCurrencies,
  amount: number,
): Promise<IQuery & { data: IUser }> => {
  try {
    const wallet = await prisma.wallet.update({
      where: { userID },
      data: {
        [currency]: { increment: amount },
      },
      include: { user: true },
    });

    const { user, ...remWallet } = wallet;

    const data: IUser = {
      ...user,
      wallet: remWallet,
    };

    return { status: { code: 201, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};

export const removeBalanceQuery = async (
  userID: string,
  currency: TCurrencies,
  amount: number,
): Promise<IQuery & { data: IUser }> => {
  try {
    const wallet = await prisma.wallet.update({
      where: { userID },
      data: {
        [currency]: { decrement: amount },
      },
      include: { user: true },
    });

    const { user, ...remWallet } = wallet;

    const data: IUser = {
      ...user,
      wallet: remWallet,
    };

    return { status: { code: 201, ok: true }, data };
  } catch (error) {
    throw catchErrorHandler(error as Error);
  }
};
