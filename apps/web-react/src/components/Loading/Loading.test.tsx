import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Loading from ".";

describe("loading component", () => {
  it("should render loading", () => {
    render(<Loading />);

    const container = screen.getByTestId("loading");

    expect(container).toBeVisible();
  });
});
