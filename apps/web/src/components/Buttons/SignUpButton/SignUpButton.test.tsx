import { screen, waitFor } from "@testing-library/react";
import { render, renderWithi18next } from "../../../utilities/testing";

import SignUpButton from ".";

describe("sign up button component", () => {
  describe("render title", () => {
    it("should render sign up title in en-US", () => {
      render(renderWithi18next(<SignUpButton />, "en-US"));

      const title = screen.getByText("Sign Up");

      expect(title).toBeVisible();
    });

    it("should render sign up title in pt-BR", () => {
      render(renderWithi18next(<SignUpButton />, "pt-BR"));

      const title = screen.getByText("Cadastrar");

      expect(title).toBeVisible();
    });
  });

  it("should open modal", async () => {
    render(<SignUpButton />);

    const signUpBtn = screen.getByTestId("sign-up-button-container");

    await waitFor(() => {
      signUpBtn.click();

      const modal = screen.getByTestId("sign-up-modal");

      expect(modal).toBeVisible();
    });
  });
});
