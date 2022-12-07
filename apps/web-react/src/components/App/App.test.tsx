import { render, screen, act } from "@testing-library/react";

import App from ".";

import "setimmediate";

describe("app component", () => {
  it("should render layout", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<App />);
    });

    const layout = screen.getByTestId("layout");

    expect(layout).toBeVisible();
  });
});
