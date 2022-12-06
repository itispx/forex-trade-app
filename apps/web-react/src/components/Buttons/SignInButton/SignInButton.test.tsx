import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utilities/testing";

import SignInButton from ".";

describe("sign in button component", () => {
  it("should render sign in title", () => {
    render(<SignInButton />);

    const title = screen.getByText("Sign In");

    expect(title).toBeVisible();
  });

  it("should open modal", () => {
    const { container } = render(<SignInButton />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const containerDiv = container.querySelector("#sign-in-button-container");

    if (containerDiv) {
      fireEvent.click(containerDiv);
    }

    const modal = screen.getByTestId("sign-in-modal");

    expect(modal).toBeVisible();
  });
});
