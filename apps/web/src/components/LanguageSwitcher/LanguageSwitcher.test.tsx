import { screen } from "@testing-library/react";
import { render } from "../../utilities/testing";

import LanguageSwitcher from ".";

describe("language switcher", () => {
  it("should render language switcher component", () => {
    render(<LanguageSwitcher />);

    const container = screen.getByTestId("language-switcher-container");

    expect(container).toBeVisible();
  });
});
