import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utilities/testing";

import SignUpModal from ".";

describe("sign up modal component", () => {
  describe("modal visibility", () => {
    const handleClose = jest.fn();

    it("should have title", () => {
      render(<SignUpModal show={true} close={handleClose} />);

      const title = screen.getByText("Sign Up");

      expect(title).toBeVisible();
    });

    it("should be visible", () => {
      render(<SignUpModal show={true} close={handleClose} />);

      const modal = screen.getByTestId("sign-up-modal");

      expect(modal).toBeVisible();
    });

    it("should not visible", () => {
      render(<SignUpModal show={false} close={handleClose} />);

      const modal = screen.queryByTestId("sign-up-modal");

      expect(modal).toBe(null);
    });

    it("should close modal", () => {
      render(<SignUpModal show={true} close={handleClose} />);

      const modal = screen.queryByTestId("sign-up-modal");

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
