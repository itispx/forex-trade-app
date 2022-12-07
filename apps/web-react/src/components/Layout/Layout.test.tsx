import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Layout from ".";

describe("app component", () => {
  it("should render layout", () => {
    render(<Layout />);

    const nav = screen.getByTestId("main-navigation-container");

    expect(nav).toBeVisible();
  });
});
