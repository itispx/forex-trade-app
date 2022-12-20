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

import SignUpForm from ".";

import { TTranslations } from "interfaces-common";

describe("sign up form", () => {
  describe("sign up form render", () => {
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

    it("should render confirm password  input", () => {
      const { container } = renderComp();

      expect(getConfirmPasswordInput(container)).toBeVisible();
    });

    it("should render confirm password placeholder (en-US)", () => {
      renderComp("en-US");

      const pc = screen.getByPlaceholderText("Confirm password");

      expect(pc).toBeDefined();
    });

    it("should render confirm password placeholder (pt-BR)", () => {
      renderComp("pt-BR");

      const pc = screen.getByPlaceholderText("Confirmar senha");

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
    describe("username validation", () => {
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

      it("should fail because username is too short (en-US)", async () => {
        const { container } = renderComp("en-US");

        await typeNtab(getUsernameInput(container), "Px");

        expect(getUsernameError()).toBe("Must have at least 3 characters");
      });

      it("should fail because username is too short (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await typeNtab(getUsernameInput(container), "Px");

        expect(getUsernameError()).toBe("Deve ter ao menos 3 caracteres");
      });
    });

    describe("password validation", () => {
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

      it("should fail because password is too short (en-US)", async () => {
        const { container } = renderComp("en-US");

        await typeNtab(getPasswordInput(container), "Pa");

        expect(getPasswordError()).toBe("Must have at least 6 characters");
      });

      it("should fail because password is too short (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await typeNtab(getPasswordInput(container), "Pa");

        expect(getPasswordError()).toBe("Deve ter ao menos 6 caracteres");
      });

      it("should fail because password has no letter (en-US)", async () => {
        const { container } = renderComp("en-US");

        await typeNtab(getPasswordInput(container), "123456");

        expect(getPasswordError()).toBe("Password must contain a letter");
      });

      it("should fail because password has no letter (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await typeNtab(getPasswordInput(container), "123456");

        expect(getPasswordError()).toBe("Senha deve conter uma letra");
      });

      it("should fail because password has no number (en-US)", async () => {
        const { container } = renderComp("en-US");

        await typeNtab(getPasswordInput(container), "abcdef");

        expect(getPasswordError()).toBe("Password must contain a number");
      });

      it("should fail because password has no number (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await typeNtab(getPasswordInput(container), "abcdef");

        expect(getPasswordError()).toBe("Senha deve conter um número");
      });
    });

    describe("confirm password validation", () => {
      it("should type valid confirm password", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "password1");
        await typeNtab(getConfirmPasswordInput(container), "password1");

        expect(getConfirmPasswordError()).toBe("");
      });

      it("should fail because confirm password is empty (en-US)", async () => {
        const { container } = renderComp("en-US");

        await clickNtab(getConfirmPasswordInput(container));

        expect(getConfirmPasswordError()).toBe("Please confirm your password");
      });

      it("should fail because confirm password is empty (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await clickNtab(getConfirmPasswordInput(container));

        expect(getConfirmPasswordError()).toBe("Por favor, confirme sua senha");
      });

      it("should fail because confirm password does not match (en-US)", async () => {
        const { container } = renderComp("en-US");

        await typeNtab(getPasswordInput(container), "password1");
        await typeNtab(getConfirmPasswordInput(container), "Pa");

        expect(getConfirmPasswordError()).toBe("Password must match");
      });

      it("should fail because confirm password does not match (pt-BR)", async () => {
        const { container } = renderComp("pt-BR");

        await typeNtab(getPasswordInput(container), "password1");
        await typeNtab(getConfirmPasswordInput(container), "Pa");

        expect(getConfirmPasswordError()).toBe("Senhas devem ser iguais");
      });
    });

    it("should successfully call submit handler function", async () => {
      const submitHandlerMock = jest.fn();

      const { container } = renderComp("en-US", false, submitHandlerMock);

      await typeNtab(getUsernameInput(container), "itspx");
      await typeNtab(getPasswordInput(container), "password123");
      await typeNtab(getConfirmPasswordInput(container), "password123");

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
      <SignUpForm isLoading={isLoading} submitHandler={submitHandler} />,
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

const getConfirmPasswordInput = (container: HTMLElement) => {
  return container.querySelector("input[name='confirmPassword']") as HTMLElement;
};

const getUsernameError = () => {
  return screen.getByTestId("username-error").textContent;
};

const getPasswordError = () => {
  return screen.getByTestId("password-error").textContent;
};

const getConfirmPasswordError = () => {
  return screen.getByTestId("confirmPassword-error").textContent;
};

const getSubmitButton = () => {
  return screen.queryByTestId("submit-button") as HTMLElement;
};

const getLoadingComponent = () => {
  return screen.queryByTestId("loading") as HTMLElement;
};
