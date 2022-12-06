import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utilities/testing";

import SignUpButton from ".";

describe("sign up button component", () => {
  it("should render sign in title", () => {
    render(<SignUpButton />);

    const title = screen.getByText("Sign Up");

    expect(title).toBeVisible();
  });

  it("should open modal", () => {
    const { container } = render(<SignUpButton />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const containerDiv = container.querySelector("#sign-up-button-container");

    if (containerDiv) {
      fireEvent.click(containerDiv);
    }

    const modal = screen.getByTestId("sign-up-modal");

    expect(modal).toBeVisible();
  });
});
