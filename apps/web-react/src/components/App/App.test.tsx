import { render, screen } from "@testing-library/react";

import App from ".";

describe("app component", () => {
  it("should render layout", () => {
    render(<App />);

    const layout = screen.getByTestId("layout");

    expect(layout).toBeVisible();
  });
});
