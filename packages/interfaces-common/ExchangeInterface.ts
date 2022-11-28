interface IExchange {
  _id: string;
  userID: string;
  in: {
    currency: "USD" | "GBP";
    amount: number;
  };
  out: {
    currency: "USD" | "GBP";
    amount: number;
  };
  createdAt: string;
}

export default IExchange;
