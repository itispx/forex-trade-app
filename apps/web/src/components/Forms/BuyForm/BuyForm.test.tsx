/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { screen, fireEvent, act } from "@testing-library/react";
import { render, renderWithi18next } from "../../../utilities/testing";
import user from "@testing-library/user-event";

import BuyForm from ".";

import { TTranslations } from "interfaces-common";

describe("buy form", () => {
  describe("buy form render", () => {
    it("should render amount input", () => {
      const { container } = renderComp();

      expect(getAmountInput(container)).toBeVisible();
    });

    it("should render amount placeholder (en-US)", () => {
      renderComp("en-US");

      const input = screen.getByPlaceholderText("Amount");

      expect(input).toBeDefined();
    });

    it("should render amount placeholder (pt-BR)", () => {
      renderComp("pt-BR");

      const input = screen.getByPlaceholderText("Valor");

      expect(input).toBeDefined();
    });

    it("should render submit button", () => {
      renderComp();

      expect(getSubmitButton()).toBeVisible();
    });

    it("should render submit button (en-US)", () => {
      renderComp("en-US");

      const submit = screen.getByText("Submit");

      expect(submit).toBeDefined();
    });

    it("should render submit button (pt-BR)", () => {
      renderComp("pt-BR");

      const submit = screen.getByText("Enviar");

      expect(submit).toBeDefined();
    });

    it("should not render submit button", () => {
      renderComp("en-US", true);

      expect(getSubmitButton()).toBe(null);
    });
  });

  it("should render loading component", () => {
    renderComp("en-US", true);

    expect(getLoadingComponent()).toBeVisible();
  });

  it("should not render loading component", () => {
    renderComp();

    expect(getLoadingComponent()).toBe(null);
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

    it("should fail because amount is empty (en-US)", async () => {
      const { container } = renderComp("en-US");

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: "" } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("Amount is required");
    });

    it("should fail because amount is empty (pt-BR)", async () => {
      const { container } = renderComp("pt-BR");

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: "" } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("Valor obrigatório");
    });

    it("should fail because amount is 0 (en-US)", async () => {
      const { container } = renderComp("en-US");

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: 0 } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("Minimal amount of 0.1");
    });

    it("should fail because amount is 0 (pt-BR)", async () => {
      const { container } = renderComp("pt-BR");

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: 0 } });

        user.click(getSubmitButton());
      });

      expect(getAmountError()).toBe("Valor mínimo de 0.1");
    });

    it("should successfully call submit handler function", async () => {
      const submitHandlerMock = jest.fn();

      const { container } = renderComp("en-US", false, submitHandlerMock);

      await act(async () => {
        fireEvent.change(getAmountInput(container), { target: { value: 10 } });

        user.click(getSubmitButton());
      });

      expect(submitHandlerMock).toHaveBeenCalledTimes(1);
    });
  });
});

const renderComp = (
  lng: TTranslations = "en-US",
  isLoading = false,
  submitHandler = () => {},
) => {
  return render(
    renderWithi18next(
      <BuyForm isLoading={isLoading} submitHandler={submitHandler} />,
      lng,
    ),
  );
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
