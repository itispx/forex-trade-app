import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
  }
};

export default connectDB;
