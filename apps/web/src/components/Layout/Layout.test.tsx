import { screen, act } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Layout from ".";

import "setimmediate";

describe("layout component", () => {
  it("should render layout", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Layout />);
    });
    const nav = screen.getByTestId("main-navigation-container");

    expect(nav).toBeVisible();
  });
});
