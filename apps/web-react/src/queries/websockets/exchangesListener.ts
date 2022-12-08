import { io } from "socket.io-client";

import { baseURL } from "../http-common";

import { IExchangeConversion } from "interfaces-common";

const socket = io(`${baseURL}/exchanges`);

const exchangesListener = (func: (params: IExchangeConversion[]) => void) => {
  socket.on("get-forex-data", (data: IExchangeConversion[]) => {
    func(data);
  });
};

export default exchangesListener;
