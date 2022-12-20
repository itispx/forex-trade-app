import { screen, waitFor } from "@testing-library/react";
import { render, renderWithi18next } from "../../../utilities/testing";

import SignInButton from ".";

describe("sign in button component", () => {
  describe("render title", () => {
    it("should render sign in title (en-US)", () => {
      render(renderWithi18next(<SignInButton />, "en-US"));

      const title = screen.getByText("Sign In");

      expect(title).toBeVisible();
    });

    it("should render sign in title (pt-BR)", () => {
      render(renderWithi18next(<SignInButton />, "pt-BR"));

      const title = screen.getByText("Entrar");

      expect(title).toBeVisible();
    });
  });

  it("should open modal", async () => {
    render(<SignInButton />);

    const signInBtn = screen.getByTestId("sign-in-button-container");

    await waitFor(() => {
      signInBtn.click();

      const modal = screen.getByTestId("sign-in-modal");

      expect(modal).toBeVisible();
    });
  });
});
