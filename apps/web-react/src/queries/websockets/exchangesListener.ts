import { io, Socket } from "socket.io-client";

import { baseURL } from "../http-common";

import { IExchangeConversion } from "interfaces-common";

export const socket = io(`${baseURL}/exchanges`);

const exchangesListener = (func: (params: IExchangeConversion[]) => void): void => {
  if (!socket.connected) {
    socket.connect();
  }

  socket.on("get-forex-data", (data: IExchangeConversion[]) => {
    func(data);
  });
};

export default exchangesListener;
