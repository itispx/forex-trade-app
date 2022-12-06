import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Currency, { Props } from ".";

describe("currency component", () => {
  it("should display 0 with 3 decimals", () => {
    const currencyInfo: Props = {
      name: "USD",
      amount: 0,
    };

    render(<Currency name={currencyInfo.name} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.name}: ${currencyInfo.amount.toFixed(3)}`);
  });

  it("should display 1.11 with 3 decimals", () => {
    const currencyInfo: Props = {
      name: "GBP",
      amount: 1.11,
    };

    render(<Currency name={currencyInfo.name} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.name}: ${currencyInfo.amount.toFixed(3)}`);
  });

  it("should display 2.2222222 with 3 decimals", () => {
    const currencyInfo: Props = {
      name: "USD",
      amount: 2.2222222,
    };

    render(<Currency name={currencyInfo.name} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.name}: ${currencyInfo.amount.toFixed(3)}`);
  });
});
