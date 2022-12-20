import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Layout from ".";

describe("layout", () => {
  it("should render layout", () => {
    render(<Layout />);

    const layout = screen.getByTestId("layout");

    expect(layout).toBeInTheDocument();
  });

  it("should render main navigation", () => {
    render(<Layout />);

    const nav = screen.getByTestId("main-navigation-container");

    expect(nav).toBeInTheDocument();
  });

  it("should render children", () => {
    render(
      <Layout>
        <div data-testid="children"></div>
      </Layout>,
    );

    const c = screen.getByTestId("children");

    expect(c).toBeInTheDocument();
  });
});
