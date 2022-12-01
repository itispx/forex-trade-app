import * as http from "http";
import app from "./src/app";

import connectDB from "./src/middleware/connect-db";

const port = process.env.PORT || 3001;

const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, { cors: { origin: "*" } });

import { getRealTimeExchangeValuesAction } from "./src/actions/exchangesActions";

const exchangeIo = io.of("/v1/exchanges");

exchangeIo.on("connection", () => {
  getRealTimeExchangeValuesAction(exchangeIo);
});

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  await connectDB();
});
