import request from "supertest";

import { Express } from "express";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { connectDB } from "./db";

import randomNumber from "./randomNumber";

import { IUserServerResponse, IExchangeInfo, OCurrency } from "interfaces-common";

export const userPayload = {
  _id: "",
  username: "test_username",
  password: "test_password",
};

export const connectMongoMemoryServer = async (): Promise<MongoMemoryServer> => {
  const mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());

  return mongoServer;
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

export const createUserDB = async (app: Express): Promise<IUserServerResponse> => {
  const response = await request(app).post("/v1/users/signup").send(userPayload);

  return response.body.success;
};

export const makeExchangeInfoObj = (): IExchangeInfo => {
  const baseCurrency = OCurrency[randomNumber(OCurrency.length - 1)];
  const baseAmount = randomNumber(80, 1);

  const convertCurrency = OCurrency.filter((cur) => baseCurrency !== cur)[
    randomNumber(OCurrency.length - 2)
  ];
  const convertAmount = randomNumber(80, 1);

  return {
    base: { currency: baseCurrency, amount: baseAmount },
    convert: { currency: convertCurrency, amount: convertAmount },
  };
};

export const createID = () => {
  return new mongoose.Types.ObjectId();
};
