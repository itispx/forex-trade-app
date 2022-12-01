import { render, screen, cleanup } from "@testing-library/react";

import SignInButton from ".";

describe("sign in button component", () => {
  it("should render sign in title", () => {
    render(<SignInButton />);

    const title = screen.getByText("Sign In");

    expect(title).toBeVisible();
  });
});
