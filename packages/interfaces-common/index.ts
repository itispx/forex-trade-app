import UserInterface, {
  UserDocumentInterface,
  UserServerResponseInterface,
} from "./UserInterface";
import ExchangeInterface, {
  ExchangeDocumentInterface,
  ExchangeConversionInterface,
  ExchangeInfoInterface,
} from "./ExchangeInterface";
import CurrenciesTypes, {
  CurrencyInfoInterface,
  CurrencyOptions,
} from "./CurrenciesTypes";
import QueryInterface from "./QueryInterface";
import APIErrorInterface from "./APIErrorInterface";

export type IUserDocument = UserDocumentInterface;
export type IUserServerResponse = UserServerResponseInterface;
export type IUser = UserInterface;
export type IExchange = ExchangeInterface;
export type IExchangeDocument = ExchangeDocumentInterface;
export type IExchangeConversion = ExchangeConversionInterface;
export type IExchangeInfo = ExchangeInfoInterface;
export type TCurrencies = CurrenciesTypes;
export type ICurrencyInfo = CurrencyInfoInterface;
export type IQuery = QueryInterface;
export type IAPIError = APIErrorInterface;

export const OCurrency = CurrencyOptions;
