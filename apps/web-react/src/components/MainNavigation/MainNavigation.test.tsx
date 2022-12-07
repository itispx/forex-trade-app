import { screen, waitFor } from "@testing-library/react";
import { render } from "../../utilities/testing";

import useFetchUser from "../../queries/useFetchUser";

import MainNavigation from ".";

jest.mock("../../queries/useFetchUser");

const useFetchUserMocked = jest.mocked(useFetchUser, true);

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

describe("main navigation component", () => {
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
});
