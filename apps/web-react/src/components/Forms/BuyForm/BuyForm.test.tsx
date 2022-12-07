/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { screen, fireEvent, act } from "@testing-library/react";
import { render } from "../../../utilities/testing";
import user from "@testing-library/user-event";

import BuyForm from ".";

describe("buy form", () => {
  describe("buy form render", () => {
    it("should render username input", () => {
      const { container } = renderComp();

      expect(getAmountInput(container)).toBeVisible();
    });

    it("should render submit button", () => {
      renderComp();

      expect(getSubmitButton()).toBeVisible();
    });

    it("should not render submit button", () => {
      renderComp(true);

      expect(getSubmitButton()).toBe(null);
    });

    it("should render loading component", () => {
      renderComp(true);

      expect(getLoadingComponent()).toBeVisible();
    });

    it("should not render loading component", () => {
      renderComp();

      expect(getLoadingComponent()).toBe(null);
    });
  });

  describe("amount validation", () => {
    it("should type valid amount", async () => {
      const { container } = renderComp();

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: 10 } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("");
    });

    it("should fail because amount is empty", async () => {
      const { container } = renderComp();

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: "" } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("Amount is required");
    });

    it("should fail because amount is 0", async () => {
      const { container } = renderComp();

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: 0 } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("Minimal amount of 0.1");
    });
  });
});

const renderComp = (isLoading = false, submitHandler = () => {}) => {
  return render(<BuyForm isLoading={isLoading} submitHandler={submitHandler} />);
};

const getAmountInput = (container: HTMLElement) => {
  return container.querySelector("input[name='amount']") as HTMLElement;
};

const getAmountError = () => {
  return screen.getByTestId("amount-error").textContent;
};

const getSubmitButton = () => {
  return screen.queryByTestId("submit-button") as HTMLElement;
};

const getLoadingComponent = () => {
  return screen.queryByTestId("loading") as HTMLElement;
};
