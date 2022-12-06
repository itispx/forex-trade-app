import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Exchange, { Props } from ".";

describe("exchange component", () => {
  const exchangeObj: Props = {
    base: { currency: "USD", amount: 3.333 },
    converted: { currency: "GBP", amount: 9.999 },

    createdAt: "2022-12-06T12:19:50.683Z",
  };

  it("should display base currency", () => {
    render(<Exchange {...exchangeObj} />);

    const bc = screen.getByTestId("base-currency").textContent;

    expect(bc).toBe(`${exchangeObj.base.currency}`);
  });

  it("should display base amount", () => {
    render(<Exchange {...exchangeObj} />);

    const ba = screen.getByTestId("base-amount").textContent;

    expect(ba).toBe(`${exchangeObj.base.amount}`);
  });

  it("should display converted currency", () => {
    render(<Exchange {...exchangeObj} />);

    const cc = screen.getByTestId("converted-currency").textContent;

    expect(cc).toBe(`${exchangeObj.converted.currency}`);
  });

  it("should display converted amount", () => {
    render(<Exchange {...exchangeObj} />);

    const ca = screen.getByTestId("converted-amount").textContent;

    expect(ca).toBe(`${exchangeObj.converted.amount}`);
  });

  it("should display created at date", () => {
    render(<Exchange {...exchangeObj} />);

    const date = new Date(exchangeObj.createdAt).toLocaleDateString();
    const time = new Date(exchangeObj.createdAt).toLocaleTimeString();

    const ca = screen.getByTestId("created-at").textContent;

    expect(ca).toBe(`${date} at ${time}`);
  });
});
