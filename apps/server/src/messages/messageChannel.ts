import { connect, Channel } from "amqplib";

import { processExchangeAction } from "../actions/exchangesActions";

export const createExchangesMessageChannel = async (): Promise<Channel> => {
  try {
    const q = "exchanges";

    const connection = await connect(process.env.AMQP_SERVER as string);

    const channel = await connection.createChannel();

    await channel.assertQueue(q);

    console.log("Connected to rabbitMQ");
    return channel;
  } catch (error) {
    throw new Error("Error connecting to rabbitMQ");
  }
};

export const consumeExchangesMessageChannel = async () => {
  const connection = await createExchangesMessageChannel();

  connection.consume("exchanges", async (exchange) => {
    if (exchange) {
      // Process exchange
      const exchangeObj = JSON.parse(exchange.content.toString());
      console.log("Exchanged received:", exchangeObj);

      await processExchangeAction(exchangeObj);

      // Tell RabbitMQ message was received
      setTimeout(() => {
        connection.ack(exchange);
        console.log("Acked");
      }, 10000);
    }
  });
};
