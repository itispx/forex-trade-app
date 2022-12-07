import { screen, waitFor } from "@testing-library/react";
import { render } from "../../utilities/testing";

import MainNavigation from ".";

import { ObjectId } from "mongoose";

import useFetchUser from "../../queries/useFetchUser";

import { useLocation } from "react-router-dom";

import { TCurrencies } from "interfaces-common";

jest.mock("../../queries/useFetchUser");

const useFetchUserMocked = jest.mocked(useFetchUser, true);

const userData = {
  data: {
    status: { code: 200, ok: true },
    doc: {
      _id: "01234567890" as unknown as ObjectId,
      username: "test_username",
      password: "hashed__password__hashed",
      wallet: {
        GBP: 1000,
        USD: 1000,
      },
      createdAt: "2022-11-30T15:50:08.043+00:00",
    },
    token: "123_token_123",
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
      render(<MainNavigation />);
      const currencies = screen.getAllByTestId("currency-display");
      const firstKey = Object.keys(userData.data.doc.wallet)[0] as TCurrencies;
      const secondKey = Object.keys(userData.data.doc.wallet)[1] as TCurrencies;
      expect(currencies.length).toBe(2);
      expect(currencies[0].textContent).toBe(
        `${firstKey}: ${userData.data.doc.wallet[firstKey].toFixed(3)}`,
      );
      expect(currencies[1].textContent).toBe(
        `${secondKey}: ${userData.data.doc.wallet[secondKey].toFixed(3)}`,
      );
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
