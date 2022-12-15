import { screen, act, fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../utilities/testing";

import "intersection-observer";

import ExchangesPage from ".";

import { getExchangesQuery } from "../../queries/exchangesQueries";
import useUserQueryData from "../../queries/hooks/useUserQueryData";

import { userMock } from "../../utilities/testing";

import { IExchange } from "interfaces-common";

jest.mock("../../queries/exchangesQueries");

const getExchangesQueryMocked = jest.mocked(getExchangesQuery, true);

const mockedExchanges: IExchange[] = [
  {
    id: "1",
    userID: userMock.doc.id,
    base: { currency: "GBP", amount: 10 },
    converted: { currency: "USD", amount: 15 },
    status: "SUCCESSFUL",
    createdAt: new Date(),
  },
  {
    id: "2",
    userID: userMock.doc.id,
    base: { currency: "USD", amount: 20 },
    converted: { currency: "GBP", amount: 30 },
    status: "SUCCESSFUL",
    createdAt: new Date(),
  },
  {
    id: "3",
    userID: userMock.doc.id,
    base: { currency: "GBP", amount: 30 },
    converted: { currency: "USD", amount: 45 },
    status: "SUCCESSFUL",
    createdAt: new Date(),
  },
  {
    id: "4",
    userID: userMock.doc.id,
    base: { currency: "USD", amount: 40 },
    converted: { currency: "GBP", amount: 60 },
    status: "SUCCESSFUL",
    createdAt: new Date(),
  },
  {
    id: "5",
    userID: userMock.doc.id,
    base: { currency: "GBP", amount: 50 },
    converted: { currency: "USD", amount: 75 },
    status: "SUCCESSFUL",
    createdAt: new Date(),
  },
];

getExchangesQueryMocked.mockResolvedValue({
  status: {
    code: 200,
    ok: true,
  },
  success: {
    docs: mockedExchanges,
  },
});

jest.mock("../../queries/hooks/useUserQueryData");

const useUserQueryDataMocked = jest.mocked(useUserQueryData, true);

const useNavigateMocked = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => useNavigateMocked,
  };
});

describe("exchanges page", () => {
  describe("redirect user if not logged in", () => {
    beforeEach(() => {
      useNavigateMocked.mockReset();
    });

    it("should redirect user to home page", async () => {
      useUserQueryDataMocked.mockImplementation(() => undefined);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        render(<ExchangesPage />);
      });

      expect(useNavigateMocked).toHaveBeenCalledWith("/");
    });

    it("should allow user to remain in page", async () => {
      useUserQueryDataMocked.mockImplementation(() => userMock);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        render(<ExchangesPage />);
      });

      const page = screen.queryByTestId("exchanges-page");

      expect(page).toBeVisible();
      expect(useNavigateMocked).not.toHaveBeenCalled();
    });
  });

  describe("render exchanges", () => {
    beforeAll(() => {
      useUserQueryDataMocked.mockImplementation(() => userMock);
    });

    it("should render the list of exchanges", async () => {
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        render(<ExchangesPage />);
      });

      const exchanges = screen.queryAllByTestId("exchange");

      expect(exchanges[0]).toBeInTheDocument();
      expect(exchanges.length).toBe(mockedExchanges.length);
    });

    it("should render loading", async () => {
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        render(<ExchangesPage />);
      });

      const exchanges = screen.queryAllByTestId("exchange");

      await waitFor(() => {
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        fireEvent.scroll(exchanges[4]);

        const loading = screen.getByTestId("loading");

        expect(loading).toBeVisible();
      });
    });
  });
});
