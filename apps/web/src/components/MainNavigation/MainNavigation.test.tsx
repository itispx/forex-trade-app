import { screen } from "@testing-library/react";
import { render, userMock } from "../../utilities/testing";

import MainNavigation from ".";

import useFetchUser from "../../queries/hooks/useFetchUser";

import { useRouter, NextRouter } from "next/router";

jest.mock("../../queries/hooks/useFetchUser");

const useFetchUserMocked = jest.mocked(useFetchUser, true);

const userData = {
  data: {
    status: { code: 200, ok: true },
    ...userMock,
  },
};

jest.mock("next/router", () => {
  const original = jest.requireActual("next/router");
  return {
    ...original,
    useRouter: jest.fn(),
  };
});

const useRouterMocked = jest.mocked(useRouter, true);

describe("main navigation component", () => {
  beforeAll(() => {
    useRouterMocked.mockImplementation(() => {
      const mocked = { pathname: "/" } as NextRouter;
      return mocked;
    });
  });

  describe("should display login buttons", () => {
    beforeAll(() => {
      useFetchUserMocked.mockImplementation(() => {
        return { data: undefined };
      });
    });

    it("should display sign in button", async () => {
      render(<MainNavigation />);
      const signInButton = screen.getByTestId("sign-in-button-container");
      expect(signInButton).toBeVisible();
    });

    it("should display sign up button", async () => {
      render(<MainNavigation />);
      const signUpButton = screen.getByTestId("sign-up-button-container");
      expect(signUpButton).toBeVisible();
    });
  });

  describe("display wallet and past exchanges link", () => {
    beforeAll(() => {
      useFetchUserMocked.mockImplementation(() => {
        return userData;
      });
    });

    it("should display wallet", () => {
      if (!userData.data.doc.wallet) return;

      render(<MainNavigation />);

      const currencies = screen.getAllByTestId("currency-display");

      expect(currencies.length).toBe(2);
      expect(currencies[0].textContent).toBe("GBP: 1000.000");
      expect(currencies[1].textContent).toBe("USD: 1000.000");
    });

    it("should display exchanges link", () => {
      useRouterMocked.mockImplementation(() => {
        const mocked = { pathname: "/" } as NextRouter;
        return mocked;
      });

      render(<MainNavigation />);

      const link = screen.getByTestId("link").textContent;

      expect(link).toBe(userData.data.doc.username);
    });

    it("should display home link", () => {
      useRouterMocked.mockImplementation(() => {
        const mocked = { pathname: "/Exchanges" } as NextRouter;
        return mocked;
      });

      render(<MainNavigation />);

      const link = screen.getByTestId("link").textContent;

      expect(link).toBe("Home");
    });
  });
});
