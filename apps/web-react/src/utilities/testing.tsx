import React from "react";
import { render, RenderOptions } from "@testing-library/react";

// Providers
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper, ...options });
};

export { customRender as render };

import { ObjectId } from "mongoose";

import { IUserServerResponse } from "interfaces-common";

export const userMock: IUserServerResponse = {
  doc: {
    _id: "01234567890" as unknown as ObjectId,
    username: "test_username",
    password: "hashed__password__hashed",
    wallet: {
      GBP: 1000,
      USD: 1000,
    },
    createdAt: "2022-11-30T15:50:08.043+00:00",
  },
  token: "123_token_123",
};
