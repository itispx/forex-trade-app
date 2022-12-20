import UserInterface, {
  WalletInterface,
  UserServerResponseInterface,
} from "./interfaces/UserInterface";

import ExchangeInterface, {
  ExchangeConversionInterface,
  ExchangeInfoInterface,
  StatusTypes,
} from "./interfaces/ExchangeInterface";

import CurrenciesTypes, {
  CurrencyInfoInterface,
  CurrencyOptions,
} from "./interfaces/CurrenciesTypes";

import QueryInterface from "./interfaces/QueryInterface";

import APIErrorInterface from "./interfaces/APIErrorInterface";

import TranslationsTypes from "./interfaces/Translations";

export type IUserServerResponse = UserServerResponseInterface;
export type IUser = UserInterface;
export type IWallet = WalletInterface;

export type IExchange = ExchangeInterface;
export type IExchangeConversion = ExchangeConversionInterface;
export type IExchangeInfo = ExchangeInfoInterface;
export type TStatus = StatusTypes;

export type TCurrencies = CurrenciesTypes;
export type ICurrencyInfo = CurrencyInfoInterface;

export type IQuery = QueryInterface;

export type IAPIError = APIErrorInterface;

export type TTranslations = TranslationsTypes;

export const OCurrency = CurrencyOptions;
