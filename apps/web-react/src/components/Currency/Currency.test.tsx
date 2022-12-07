import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Currency, { Props } from ".";

describe("currency component", () => {
  it("should display 0 as 0.000", () => {
    const currencyInfo: Props = {
      name: "USD",
      amount: 0,
    };

    render(<Currency name={currencyInfo.name} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.name}: 0.000`);
  });

  it("should display 1.11 as 1.110", () => {
    const currencyInfo: Props = {
      name: "GBP",
      amount: 1.11,
    };

    render(<Currency name={currencyInfo.name} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.name}: 1.110`);
  });

  it("should display 2.2222222 as 2.222", () => {
    const currencyInfo: Props = {
      name: "USD",
      amount: 2.2222222,
    };

    render(<Currency name={currencyInfo.name} amount={currencyInfo.amount} />);

    const cd = screen.getByTestId("currency-display").textContent;

    expect(cd).toBe(`${currencyInfo.name}: 2.222`);
  });
});
