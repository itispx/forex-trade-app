import UserInterface, {
  WalletInterface,
  UserServerResponseInterface,
} from "./interfaces/UserInterface";

import ExchangeInterface, {
  ExchangeConversionInterface,
  ExchangeInfoInterface,
} from "./interfaces/ExchangeInterface";

import CurrenciesTypes, {
  CurrencyInfoInterface,
  CurrencyOptions,
} from "./interfaces/CurrenciesTypes";

import QueryInterface from "./interfaces/QueryInterface";

import APIErrorInterface from "./interfaces/APIErrorInterface";

export type IUserServerResponse = UserServerResponseInterface;
export type IUser = UserInterface;
export type IWallet = WalletInterface;

export type IExchange = ExchangeInterface;
export type IExchangeConversion = ExchangeConversionInterface;
export type IExchangeInfo = ExchangeInfoInterface;

export type TCurrencies = CurrenciesTypes;
export type ICurrencyInfo = CurrencyInfoInterface;

export type IQuery = QueryInterface;

export type IAPIError = APIErrorInterface;

export const OCurrency = CurrencyOptions;
