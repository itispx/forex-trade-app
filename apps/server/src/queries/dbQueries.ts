import mongoose, { ConnectionStates } from "mongoose";

export const connectDBQuery = async (url: string): Promise<void> => {
  await mongoose.connect(url);
};

export const getConnectionState = (): ConnectionStates => {
  return mongoose.connection.readyState;
};
