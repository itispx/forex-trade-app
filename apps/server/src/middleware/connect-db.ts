import { RequestHandler } from "express";

import { getConnectionState, connectDBQuery } from "../queries/dbQueries";

const connectDB: RequestHandler = async (req, res, next) => {
  if (getConnectionState() === 0) {
    await connectDBQuery(process.env.MONGO_DB_URI as string);
  }

  next();
};

export default connectDB;
