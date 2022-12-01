import { Server } from "socket.io";

import { getCurrentExchangeValues } from "../queries/exchangesQueries";

export const getRealTimeExchangeValuesAction = async (io: Server): Promise<void> => {
  const response = await getCurrentExchangeValues("USD", "GBP");

  io.emit("get-forex-data", response);
};
