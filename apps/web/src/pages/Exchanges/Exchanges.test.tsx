/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
import { screen, act } from "@testing-library/react";
import {
  render,
  renderWithi18next,
  userMock,
  exchangeMock,
} from "../../utilities/testing";

import "intersection-observer";

import ExchangesPage from ".";

import { getExchangesQuery } from "../../queries/exchangesQueries";
import getUserQueryData from "../../queries/getUserQueryData";

import { IExchange } from "interfaces-common";

jest.mock("../../queries/exchangesQueries");

const getExchangesQueryMocked = jest.mocked(getExchangesQuery, true);

const mockedExchanges: IExchange[] = [
  { ...exchangeMock("SUCCESSFUL"), id: "1" },
  { ...exchangeMock("PENDING"), id: "2" },
  { ...exchangeMock("FAILED"), id: "3" },
  { ...exchangeMock("SUCCESSFUL"), id: "4" },
  { ...exchangeMock("SUCCESSFUL"), id: "5" },
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

jest.mock("../../queries/getUserQueryData");

const getUserQueryDataMocked = jest.mocked(getUserQueryData, true);

import { useRouter, NextRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const push = jest.fn();

const useRouterMocked = jest.mocked(useRouter, true);

const columns_en_US = ["ID", "Currency", "Base", "Converted", "Status", "Date", "Time"];
const columns_pt_BR = ["ID", "Moeda", "Base", "Convertido", "Status", "Data", "Horário"];

describe("exchanges page", () => {
  describe("redirect user if not logged in", () => {
    it("should redirect user to home page", async () => {
      getUserQueryDataMocked.mockImplementation(() => undefined);

      useRouterMocked.mockImplementation(() => {
        const mocked = { push } as unknown as NextRouter;
        return mocked;
      });

      await act(async () => {
        render(<ExchangesPage />);
      });

      expect(push).toHaveBeenCalledWith("/Dashboard");
    });

    it("should allow user to remain in page", async () => {
      push.mockReset();
      getUserQueryDataMocked.mockImplementation(() => userMock);
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
      getUserQueryDataMocked.mockImplementation(() => userMock);
    });

    it("should render page", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const page = screen.queryByTestId("exchanges-page");

      expect(page).toBeInTheDocument();
    });

    it("should render table header cells (en-US)", async () => {
      await act(async () => {
        render(renderWithi18next(<ExchangesPage />, "en-US"));
      });

      const headerCells = screen.queryAllByTestId("table-header-cell");

      for (let i = 0; i < columns_en_US.length; i++) {
        expect(headerCells[i].textContent).toBe(columns_en_US[i]);
      }
    });

    it("should render table header cells (pt-BR)", async () => {
      await act(async () => {
        render(renderWithi18next(<ExchangesPage />, "pt-BR"));
      });

      const headerCells = screen.queryAllByTestId("table-header-cell");

      for (let i = 0; i < columns_pt_BR.length; i++) {
        expect(headerCells[i].textContent).toBe(columns_pt_BR[i]);
      }
    });

    it("should render id column", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[0].textContent).toBe(mockedExchanges[0].id);
      expect(rows[7].textContent).toBe(mockedExchanges[1].id);
      expect(rows[14].textContent).toBe(mockedExchanges[2].id);
      expect(rows[21].textContent).toBe(mockedExchanges[3].id);
      expect(rows[28].textContent).toBe(mockedExchanges[4].id);
    });

    it("should render currency column", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[1].textContent).toBe(
        `${mockedExchanges[0].base.currency}/${mockedExchanges[0].converted.currency}`,
      );
      expect(rows[8].textContent).toBe(
        `${mockedExchanges[1].base.currency}/${mockedExchanges[1].converted.currency}`,
      );
      expect(rows[15].textContent).toBe(
        `${mockedExchanges[2].base.currency}/${mockedExchanges[2].converted.currency}`,
      );
      expect(rows[22].textContent).toBe(
        `${mockedExchanges[3].base.currency}/${mockedExchanges[3].converted.currency}`,
      );
      expect(rows[29].textContent).toBe(
        `${mockedExchanges[4].base.currency}/${mockedExchanges[4].converted.currency}`,
      );
    });

    it("should render base column", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[2].textContent).toBe(mockedExchanges[0].base.amount.toFixed(3));
      expect(rows[9].textContent).toBe(mockedExchanges[1].base.amount.toFixed(3));
      expect(rows[16].textContent).toBe(mockedExchanges[2].base.amount.toFixed(3));
      expect(rows[23].textContent).toBe(mockedExchanges[3].base.amount.toFixed(3));
      expect(rows[30].textContent).toBe(mockedExchanges[4].base.amount.toFixed(3));
    });

    it("should render converted column", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[3].textContent).toBe(mockedExchanges[0].converted.amount.toFixed(3));
      expect(rows[10].textContent).toBe(mockedExchanges[1].converted.amount.toFixed(3));
      expect(rows[17].textContent).toBe(mockedExchanges[2].converted.amount.toFixed(3));
      expect(rows[24].textContent).toBe(mockedExchanges[3].converted.amount.toFixed(3));
      expect(rows[31].textContent).toBe(mockedExchanges[4].converted.amount.toFixed(3));
    });

    it("should render status column (en-US)", async () => {
      await act(async () => {
        render(renderWithi18next(<ExchangesPage />, "en-US"));
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[4].textContent).toBe("SUCCESSFUL");
      expect(rows[11].textContent).toBe("PENDING");
      expect(rows[18].textContent).toBe("FAILED");
      expect(rows[25].textContent).toBe("SUCCESSFUL");
      expect(rows[32].textContent).toBe("SUCCESSFUL");
    });

    it("should render status column (pt-BR)", async () => {
      await act(async () => {
        render(renderWithi18next(<ExchangesPage />, "pt-BR"));
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[4].textContent).toBe("SUCESSO");
      expect(rows[11].textContent).toBe("PENDENTE");
      expect(rows[18].textContent).toBe("FALHA");
      expect(rows[25].textContent).toBe("SUCESSO");
      expect(rows[32].textContent).toBe("SUCESSO");
    });

    it("should render date column", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[5].textContent).toBe(
        new Date(mockedExchanges[0].createdAt).toLocaleDateString(),
      );
      expect(rows[12].textContent).toBe(
        new Date(mockedExchanges[1].createdAt).toLocaleDateString(),
      );
      expect(rows[19].textContent).toBe(
        new Date(mockedExchanges[2].createdAt).toLocaleDateString(),
      );
      expect(rows[26].textContent).toBe(
        new Date(mockedExchanges[3].createdAt).toLocaleDateString(),
      );
      expect(rows[33].textContent).toBe(
        new Date(mockedExchanges[4].createdAt).toLocaleDateString(),
      );
    });

    it("should render time column", async () => {
      await act(async () => {
        render(<ExchangesPage />);
      });

      const rows = screen.queryAllByTestId("table-data-cell");

      expect(rows[6].textContent).toBe(
        new Date(mockedExchanges[0].createdAt).toLocaleTimeString(),
      );
      expect(rows[13].textContent).toBe(
        new Date(mockedExchanges[1].createdAt).toLocaleTimeString(),
      );
      expect(rows[20].textContent).toBe(
        new Date(mockedExchanges[2].createdAt).toLocaleTimeString(),
      );
      expect(rows[27].textContent).toBe(
        new Date(mockedExchanges[3].createdAt).toLocaleTimeString(),
      );
      expect(rows[34].textContent).toBe(
        new Date(mockedExchanges[4].createdAt).toLocaleTimeString(),
      );
    });
  });
});
