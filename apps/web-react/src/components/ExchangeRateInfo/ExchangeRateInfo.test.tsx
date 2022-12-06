import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import useUserQueryData from "../../queries/useUserQueryData";

import { Types } from "mongoose";

import ExchangeRateInfo, { Props } from ".";

//     doc: {
//       _id: "01234567890" as unknown as Types.ObjectId,
//       username: "test_username",
//       password: "hashed__password__hashed",
//       wallet: {
//         GBP: 1000,
//         USD: 1000,
//       },
//       createdAt: "2022-11-30T15:50:08.043+00:00",
//     },
//     token: "123_token_123",

const useUserQueryDataMock = jest.fn(useUserQueryData);

describe("exchange rate info component", () => {
  const exchangeRateInfo: Props = {
    exchangeInfo: { base: "USD", converted: "GBP", exchangeRate: 0.6 },
  };

  it("should display title", () => {
    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const title = screen.getByText("BUY").textContent;

    expect(title).toBe("BUY");
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

  it.todo("should open modal", async () => {
    useUserQueryDataMock.mockImplementation(async () => {
      return {
        doc: {
          _id: "01234567890" as unknown as Types.ObjectId,
          username: "test_username",
          password: "hashed__password__hashed",
          wallet: {
            GBP: 1000,
            USD: 1000,
          },
          createdAt: "2022-11-30T15:50:08.043+00:00",
        },
        token: "123_token_123",
      };
    });

    render(<ExchangeRateInfo {...exchangeRateInfo} />);

    const buyBtn = screen.getByTestId("buy-button-container");

    fireEvent.click(buyBtn);

    const modal = screen.queryByTestId("buy-modal");

    expect(modal).toBeVisible();
  });
});
