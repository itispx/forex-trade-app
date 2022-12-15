import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../../utilities/testing";

import SignUpButton from ".";

describe("sign up button component", () => {
  it("should render sign in title", () => {
    render(<SignUpButton />);

    const title = screen.getByText("Sign Up");

    expect(title).toBeVisible();
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
