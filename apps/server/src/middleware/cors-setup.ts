import { RequestHandler } from "express";

const corsSetup: RequestHandler = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.status(200).json({});
  }

  next();
};

export default corsSetup;
