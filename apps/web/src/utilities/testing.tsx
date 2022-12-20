/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from "react";
import { render, RenderOptions, act } from "@testing-library/react";
import user from "@testing-library/user-event";

// Providers
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, I18nextProvider } from "react-i18next";

import { IUserServerResponse, TStatus, IExchange } from "interfaces-common";

import enCommon from "../../public/locales/en-US/common.json";
import enAuth from "../../public/locales/en-US/auth.json";
import enToast from "../../public/locales/en-US/toast.json";
import ptCommon from "../../public/locales/pt-BR/common.json";
import ptAuth from "../../public/locales/pt-BR/auth.json";
import ptToast from "../../public/locales/pt-BR/toast.json";

const translations = {
  "en-US": {
    common: enCommon,
    auth: enAuth,
    toast: enToast,
  },
  "pt-BR": {
    common: ptCommon,
    auth: ptAuth,
    toast: ptToast,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en-US",
    debug: false,
    resources: translations,
    interpolation: {
      escapeValue: false,
    },
  });

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // Component will always load with default language as "en-US" unless specified otherwise
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
};

export const renderWithi18next = (
  Component: React.ReactElement,
  lng: "en-US" | "pt-BR",
) => {
  i18n.changeLanguage(lng);
  return <I18nextProvider i18n={i18n}>{Component}</I18nextProvider>;
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
