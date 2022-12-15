/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
import { screen, act, fireEvent, waitFor } from "@testing-library/react";
import { render, userMock, exchangeMock } from "../../utilities/testing";

import "intersection-observer";

import ExchangesPage from ".";

import { getExchangesQuery } from "../../queries/exchangesQueries";
import useUserQueryData from "../../queries/hooks/useUserQueryData";

import { IExchange } from "interfaces-common";

jest.mock("../../queries/exchangesQueries");

const getExchangesQueryMocked = jest.mocked(getExchangesQuery, true);

const mockedExchange = exchangeMock("SUCCESSFUL");

const mockedExchanges: IExchange[] = [
  { ...mockedExchange, id: "1" },
  { ...mockedExchange, id: "2" },
  { ...mockedExchange, id: "3" },
  { ...mockedExchange, id: "4" },
  { ...mockedExchange, id: "5" },
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

import { useRouter, NextRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const push = jest.fn();

const useRouterMocked = jest.mocked(useRouter, true);

describe("exchanges page", () => {
  describe("redirect user if not logged in", () => {
    it("should redirect user to home page", async () => {
      useUserQueryDataMocked.mockImplementation(() => undefined);

      useRouterMocked.mockImplementation(() => {
        const mocked = { push } as unknown as NextRouter;
        return mocked;
      });

      await act(async () => {
        render(<ExchangesPage />);
      });

      expect(push).toHaveBeenCalledWith("/");
    });

    it("should allow user to remain in page", async () => {
      push.mockReset();
      useUserQueryDataMocked.mockImplementation(() => userMock);
      useRouterMocked.mockImplementation(() => {
        const mocked = { push } as unknown as NextRouter;
        return mocked;
      });

      await act(async () => {
        render(<ExchangesPage />);
      });

      const page = screen.queryByTestId("exchanges-page");

      expect(page).toBeVisible();
      expect(push).not.toHaveBeenCalled();
    });
  });

  describe("render exchanges", () => {
    beforeAll(() => {
      useUserQueryDataMocked.mockImplementation(() => userMock);
    });

    it("should render the list of exchanges", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const exchanges = screen.queryAllByTestId("exchange");

      expect(exchanges[0]).toBeInTheDocument();
      expect(exchanges.length).toBe(mockedExchanges.length);
    });

    it("should render loading", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const exchanges = screen.queryAllByTestId("exchange");

      await waitFor(() => {
        fireEvent.scroll(exchanges[4]);

        const loading = screen.getByTestId("loading");

        expect(loading).toBeVisible();
      });
    });
  });
});
