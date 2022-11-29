import UserInterface, { UserDocumentInterface } from "./UserInterface";
import ExchangeInterface, { ExchangeDocumentInterface } from "./ExchangeInterface";
import QueryInterface from "./QueryInterface";
import APIErrorInterface from "./APIErrorInterface";
import CurrenciesTypes from "./CurrenciesTypes";

export type IUserDocument = UserDocumentInterface;
export type IUser = UserInterface;
export type IExchange = ExchangeInterface;
export type IExchangeDocument = ExchangeDocumentInterface;
export type IQuery = QueryInterface;
export type IAPIError = APIErrorInterface;
export type TCurrencies = CurrenciesTypes;
