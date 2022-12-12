import { screen } from "@testing-library/react";
import { render, userMock } from "../../utilities/testing";

import MainNavigation from ".";

import useFetchUser from "../../queries/hooks/useFetchUser";

import { useLocation } from "react-router-dom";

import { TCurrencies } from "interfaces-common";

jest.mock("../../queries/hooks/useFetchUser");

const useFetchUserMocked = jest.mocked(useFetchUser, true);

const userData = {
  data: {
    status: { code: 200, ok: true },
    ...userMock,
  },
};

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useLocation: jest.fn(),
  };
});

const useLocationMocked = jest.mocked(useLocation, true);

describe("main navigation component", () => {
  beforeAll(() => {
    useLocationMocked.mockImplementation(() => {
      const pathname = "/";
      return { pathname, hash: "", key: "default", search: "", state: null };
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
      useLocationMocked.mockImplementation(() => {
        const pathname = "/";
        return { pathname, hash: "", key: "default", search: "", state: null };
      });

      render(<MainNavigation />);

      const link = screen.getByTestId("link").textContent;

      expect(link).toBe(userData.data.doc.username);
    });

    it("should display home link", () => {
      useLocationMocked.mockImplementation(() => {
        const pathname = "/exchanges";
        return { pathname, hash: "", key: "default", search: "", state: null };
      });

      render(<MainNavigation />);

      const link = screen.getByTestId("link").textContent;

      expect(link).toBe("Home");
    });
  });
});
