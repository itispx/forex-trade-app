import { screen, waitFor } from "@testing-library/react";
import { render, renderWithi18next, userMock } from "../../utilities/testing";

import getUserQueryData from "../../queries/getUserQueryData";

import ExchangeRateInfo, { Props } from ".";

jest.mock("../../queries/getUserQueryData");

const getUserQueryDataMocked = jest.mocked(getUserQueryData, true);

describe("exchange rate info component", () => {
  const exchangeRateInfo: Props = {
    exchangeInfo: { base: "USD", converted: "GBP", exchangeRate: 0.6 },
  };

  describe("render title", () => {
    it("should display buy title (en-US)", () => {
      render(renderWithi18next(<ExchangeRateInfo {...exchangeRateInfo} />, "en-US"));

      const title = screen.getByText("BUY").textContent;

      expect(title).toBeDefined();
    });

    it("should display buy title (pt-BR)", () => {
      render(renderWithi18next(<ExchangeRateInfo {...exchangeRateInfo} />, "pt-BR"));

      const title = screen.getByText("COMPRAR").textContent;

      expect(title).toBeDefined();
    });
  });

  it("should display base currency", () => {
    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const bc = screen.getByTestId("base-currency").textContent;

    expect(bc).toBe(`${exchangeRateInfo.exchangeInfo.base}`);
  });

  it("should display base amount", () => {
    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const ba = screen.getByTestId("base-amount").textContent;

    expect(ba).toBe("1");
  });

  it("should display converted currency", () => {
    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const cc = screen.getByTestId("converted-currency").textContent;

    expect(cc).toBe(`${exchangeRateInfo.exchangeInfo.converted}`);
  });

  it("should display converted amount", () => {
    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const ca = screen.getByTestId("converted-amount").textContent;

    expect(ca).toBe(`${exchangeRateInfo.exchangeInfo.exchangeRate}`);
  });

  it("should not open modal because user is not logged in", async () => {
    getUserQueryDataMocked.mockImplementation(() => undefined);

    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const buyBtn = screen.getByTestId("buy-button-container");

    buyBtn.click();

    const modal = screen.queryByTestId("buy-modal");

    expect(modal).toBe(null);
  });

  it("should open modal", async () => {
    getUserQueryDataMocked.mockImplementation(() => userMock);

    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const buyBtn = screen.getByTestId("buy-button-container");

    await waitFor(() => {
      buyBtn.click();

      const modal = screen.getByTestId("buy-modal");

      expect(modal).toBeVisible();
    });
  });
});
