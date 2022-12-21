/* eslint-disable testing-library/no-unnecessary-act */
import { screen, act } from "@testing-library/react";
import { render } from "../utilities/testing";

import DashboardPage from "../pages/Dashboard";

import "setimmediate";

import exchangesListener from "../queries/websockets/exchangesListener";

import { IExchangeConversion } from "interfaces-common";

jest.mock("../queries/websockets/exchangesListener");

const exchangesListenerMocked = jest.mocked(exchangesListener, true);

const mockedExchangeConversions: IExchangeConversion[] = [
  { base: "USD", converted: "GBP", exchangeRate: 0.3 },
  { base: "GBP", converted: "USD", exchangeRate: 1.6 },
  { base: "USD", converted: "GBP", exchangeRate: 2.9 },
  { base: "GBP", converted: "USD", exchangeRate: 3.3 },
  { base: "USD", converted: "GBP", exchangeRate: 4.6 },
  { base: "GBP", converted: "USD", exchangeRate: 5.9 },
];

describe("dashboard page", () => {
  describe("render exchanges", () => {
    it("should render loading", () => {
      exchangesListenerMocked.mockImplementation(() => []);

      render(<DashboardPage />);

      expect(screen.getByTestId("loading")).toBeVisible();
    });

    it("should not render loading", async () => {
      exchangesListenerMocked.mockImplementation(
        (func: (params: IExchangeConversion[]) => void) => {
          func(mockedExchangeConversions);
        },
      );

      await act(() => {
        render(<DashboardPage />);
      });

      expect(screen.queryByTestId("loading")).toBe(null);
    });

    it("should render exchanges", async () => {
      exchangesListenerMocked.mockImplementation(
        (func: (params: IExchangeConversion[]) => void) => {
          func(mockedExchangeConversions);
        },
      );

      await act(() => {
        render(<DashboardPage />);
      });

      const exchanges = screen.queryAllByTestId("exchange-rate-info");

      expect(exchanges[0]).toBeInTheDocument();
      expect(exchanges.length).toBe(mockedExchangeConversions.length);
    });
  });
});
