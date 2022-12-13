import React from "react";
import { render, RenderOptions, act } from "@testing-library/react";
import user from "@testing-library/user-event";

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

import { IUserServerResponse } from "interfaces-common";

export const userMock: IUserServerResponse = {
  doc: {
    id: "01234567890",
    username: "test_username",
    password: "hashed__password__hashed",
    wallet: {
      id: "abcdefg",
      userID: "01234567890",
      GBP: 1000,
      USD: 1000,
    },
    createdAt: new Date(),
  },
  token: "123_token_123",
};

export const typeNtab = async (input: HTMLElement, text: string) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(() => {
    user.type(input, text);

    user.tab();
  });
};

export const clickNtab = async (element: HTMLElement) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(() => {
    user.click(element);

    user.tab();
  });
};
