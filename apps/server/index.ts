import * as http from "http";
import app from "./src/app";

const port = process.env.PORT || 3001;

const server = http.createServer(app);

import { consumeExchangesMessageChannel } from "./src/messages/messageChannel";

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  // Consume messages from RabbitMQ
  consumeExchangesMessageChannel();
});

import { Server } from "socket.io";

const io = new Server(server, { cors: { origin: "*" } });

import { getRealTimeExchangeValuesAction } from "./src/actions/exchangesActions";

const exchangeIo = io.of("/v1/exchanges");

exchangeIo.on("connection", () => {
  getRealTimeExchangeValuesAction(exchangeIo);
});
