import request from "supertest";

import { Express } from "express";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { connectDB } from "./db";

import { IUserServerResponse } from "interfaces-common";

export const userPayload = {
  _id: "",
  username: "test_username",
  password: "test_password",
};

export const connectMongoMemoryServer = async (): Promise<void> => {
  const mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

export const createUserDB = async (app: Express): Promise<IUserServerResponse> => {
  const response = await request(app).post("/v1/users/signup").send(userPayload);

  return response.body.success;
};
