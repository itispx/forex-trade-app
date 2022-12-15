import React from "react";
import { render, RenderOptions, act } from "@testing-library/react";
import user from "@testing-library/user-event";

// Providers
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

import { IUserServerResponse, TStatus, IExchange } from "interfaces-common";

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper, ...options });
};

export { customRender as render };

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

export const exchangeMock = (status: TStatus): IExchange => {
  return {
    id: "random_exchange_id_123",
    userID: userMock.doc.id,
    base: { currency: "USD", amount: 5 },
    converted: { currency: "GBP", amount: 12 },
    status,
    createdAt: new Date(),
  };
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
