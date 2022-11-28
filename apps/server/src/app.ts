import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app: Express = express();

// Logging
app.use(morgan("dev"));

// Replaces body-parser (express 4.16+)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
import corsSetup from "./middleware/cors-setup";
import APIErrorHandler from "./middleware/api-error-handler";

// Cors config
app.use(corsSetup);

app.use("/v1/ping", (req, res) => res.status(200).send("pong"));

// Catch errors
app.use(APIErrorHandler);

export default app;
