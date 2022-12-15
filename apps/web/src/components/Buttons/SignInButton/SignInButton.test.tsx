import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../utilities/testing";

import SignInButton from ".";

describe("sign in button component", () => {
  it("should render sign in title", () => {
    render(<SignInButton />);

    const title = screen.getByText("Sign In");

    expect(title).toBeVisible();
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
