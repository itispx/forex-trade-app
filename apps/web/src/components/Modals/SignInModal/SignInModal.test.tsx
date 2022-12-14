import { screen, fireEvent } from "@testing-library/react";
import { render, renderWithi18next } from "../../../utilities/testing";

import SignInModal from ".";

describe("sign in modal component", () => {
  describe("modal visibility", () => {
    const handleClose = jest.fn();

    it("should have title (en-US)", () => {
      render(renderWithi18next(<SignInModal show={true} close={handleClose} />, "en-US"));

      const title = screen.getByText("Sign In");

      expect(title).toBeVisible();
    });

    it("should have title (pt-BR)", () => {
      render(renderWithi18next(<SignInModal show={true} close={handleClose} />, "pt-BR"));

      const title = screen.getByText("Entrar");

      expect(title).toBeVisible();
    });

    it("should be visible", () => {
      render(<SignInModal show={true} close={handleClose} />);

      const modal = screen.getByTestId("sign-in-modal");

      expect(modal).toBeVisible();
    });

    it("should not visible", () => {
      render(<SignInModal show={false} close={handleClose} />);

      const modal = screen.queryByTestId("sign-in-modal");

      expect(modal).toBe(null);
    });

    it("should close modal", () => {
      render(<SignInModal show={true} close={handleClose} />);

      const modal = screen.queryByTestId("sign-in-modal");

      if (modal) {
        fireEvent.keyDown(modal, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          charCode: 27,
        });
      }

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
