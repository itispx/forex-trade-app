/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { screen, act } from "@testing-library/react";
import {
  render,
  renderWithi18next,
  typeNtab,
  clickNtab,
} from "../../../utilities/testing";
import user from "@testing-library/user-event";

import SignInForm from ".";

import { TTranslations } from "interfaces-common";

describe("sign in form", () => {
  describe("sign in form render", () => {
    it("should render username input", () => {
      const { container } = renderComp();

      expect(getUsernameInput(container)).toBeVisible();
    });

    it("should render username placeholder (en-US)", () => {
      renderComp("en-US");

      const pc = screen.getByPlaceholderText("Username");

      expect(pc).toBeDefined();
    });

    it("should render username placeholder (pt-BR)", () => {
      renderComp("pt-BR");

      const pc = screen.getByPlaceholderText("Nome de usuário");

      expect(pc).toBeDefined();
    });

    it("should render password input", () => {
      const { container } = renderComp();

      expect(getPasswordInput(container)).toBeVisible();
    });

    it("should render password placeholder (en-US)", () => {
      renderComp("en-US");

      const pc = screen.getByPlaceholderText("Password");

      expect(pc).toBeDefined();
    });

    it("should render password placeholder (pt-BR)", () => {
      renderComp("pt-BR");

      const pc = screen.getByPlaceholderText("Senha");

      expect(pc).toBeDefined();
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

    it("should render loading component", () => {
      renderComp("en-US", true);

      expect(getLoadingComponent()).toBeVisible();
    });

    it("should not render loading component", () => {
      renderComp();

      expect(getLoadingComponent()).toBe(null);
    });
  });

  describe("form validation", () => {
    describe("username", () => {
      it("should type valid username", async () => {
        const { container } = renderComp();

        await typeNtab(getUsernameInput(container), "itspx");

        expect(getUsernameError()).toBe("");
      });

      it("should fail because username is empty (en-US)", async () => {
        const { container } = renderComp("en-US");

        await clickNtab(getUsernameInput(container));

        expect(getUsernameError()).toBe("Username is required");
      });

      it("should fail because username is empty (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await clickNtab(getUsernameInput(container));

        expect(getUsernameError()).toBe("Nome de usuário obrigatório");
      });
    });

    describe("password", () => {
      it("should type valid password", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "password1");

        expect(getPasswordError()).toBe("");
      });

      it("should fail because password is empty (en-US)", async () => {
        const { container } = renderComp("en-US");

        await clickNtab(getPasswordInput(container));

        expect(getPasswordError()).toBe("Password is required");
      });

      it("should fail because password is empty (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await clickNtab(getPasswordInput(container));

        expect(getPasswordError()).toBe("Senha obrigatória");
      });
    });

    it("should successfully call submit handler function", async () => {
      const submitHandlerMock = jest.fn();

      const { container } = renderComp("en-US", false, submitHandlerMock);

      await typeNtab(getUsernameInput(container), "itspx");
      await typeNtab(getPasswordInput(container), "password123");

      await act(() => {
        user.click(getSubmitButton());
      });

      expect(submitHandlerMock).toHaveBeenCalledTimes(1);
      expect(submitHandlerMock).toHaveBeenLastCalledWith("itspx", "password123");
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
      <SignInForm isLoading={isLoading} submitHandler={submitHandler} />,
      lng,
    ),
  );
};

const getUsernameInput = (container: HTMLElement) => {
  return container.querySelector("input[name='username']") as HTMLElement;
};

const getPasswordInput = (container: HTMLElement) => {
  return container.querySelector("input[name='password']") as HTMLElement;
};

const getUsernameError = () => {
  return screen.getByTestId("username-error").textContent;
};

const getPasswordError = () => {
  return screen.getByTestId("password-error").textContent;
};

const getSubmitButton = () => {
  return screen.queryByTestId("submit-button") as HTMLElement;
};

const getLoadingComponent = () => {
  return screen.queryByTestId("loading") as HTMLElement;
};
