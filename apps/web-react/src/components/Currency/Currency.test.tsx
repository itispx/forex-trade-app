import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Currency from ".";

import { ICurrencyInfo } from "interfaces-common";

describe("currency component", () => {
  it("should display 0 with 3 decimals", () => {
    const currencyInfo: ICurrencyInfo = {
      currency: "USD",
      amount: 0,
    };

    render(<Currency name={currencyInfo.currency} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.currency}: ${currencyInfo.amount.toFixed(3)}`);
  });

  it("should display 1.11 with 3 decimals", () => {
    const currencyInfo: ICurrencyInfo = {
      currency: "GBP",
      amount: 1.11,
    };

    render(<Currency name={currencyInfo.currency} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.currency}: ${currencyInfo.amount.toFixed(3)}`);
  });

  it("should display 2.2222222 with 3 decimals", () => {
    const currencyInfo: ICurrencyInfo = {
      currency: "USD",
      amount: 2.2222222,
    };

    render(<Currency name={currencyInfo.currency} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.currency}: ${currencyInfo.amount.toFixed(3)}`);
  });
});
