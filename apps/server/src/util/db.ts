import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
};
