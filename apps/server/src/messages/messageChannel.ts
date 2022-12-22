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
    console.log("Error connecting to rabbitMQ:", error);
    throw new Error("Error connecting to rabbitMQ");
  }
};

export const consumeExchangesMessageChannel = async () => {
  const connection = await createExchangesMessageChannel();

  // Tells RabbitMQ to process one message at a time
  connection.prefetch(1);

  connection.consume("exchanges", async (exchange) => {
    if (exchange) {
      setTimeout(async () => {
        // Process exchange
        const exchangeObj = JSON.parse(exchange.content.toString());

        await processExchangeAction(exchangeObj);

        // Tell RabbitMQ message was received
        connection.ack(exchange);
      }, 10000);
    }
  });
};
