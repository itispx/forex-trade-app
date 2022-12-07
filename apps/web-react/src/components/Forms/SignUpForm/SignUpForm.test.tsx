import { screen, act } from "@testing-library/react";
import { render, typeNtab, clickNtab } from "../../../utilities/testing";
import user from "@testing-library/user-event";

import SignUpForm from ".";

describe("sign up form", () => {
  describe("sign up form render", () => {
    it("should render username input", () => {
      const { container } = renderComp();

      expect(getUsernameInput(container)).toBeInTheDocument();
    });

    it("should render password input", () => {
      const { container } = renderComp();

      expect(getPasswordInput(container)).toBeInTheDocument();
    });

    it("should render confirm password  input", () => {
      const { container } = renderComp();

      expect(getConfirmPasswordInput(container)).toBeInTheDocument();
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

  describe("form validation", () => {
    describe("username", () => {
      it("should type valid username", async () => {
        const { container } = renderComp();

        await typeNtab(getUsernameInput(container), "itspx");

        expect(getUsernameError()).toBe("");
      });

      it("should fail because username is empty", async () => {
        const { container } = renderComp();

        await clickNtab(getUsernameInput(container));

        expect(getUsernameError()).toBe("Username is required");
      });

      it("should fail because username is too short", async () => {
        const { container } = renderComp();

        await typeNtab(getUsernameInput(container), "Px");

        expect(getUsernameError()).toBe("Must have at least 3 characters");
      });
    });

    describe("password", () => {
      it("should type valid password", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "password1");

        expect(getPasswordError()).toBe("");
      });

      it("should fail because password is empty", async () => {
        const { container } = renderComp();

        await clickNtab(getPasswordInput(container));

        expect(getPasswordError()).toBe("Password is required");
      });

      it("should fail because password is too short", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "Pa");

        expect(getPasswordError()).toBe("Must have at least 6 characters");
      });

      it("should fail because password has no letter", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "123456");

        expect(getPasswordError()).toBe("Password must contain a letter");
      });

      it("should fail because password has no number", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "abcdef");

        expect(getPasswordError()).toBe("Password must contain a number");
      });
    });

    describe("confirm password", () => {
      it("should type valid confirm password", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "password1");
        await typeNtab(getConfirmPasswordInput(container), "password1");

        expect(getConfirmPasswordError()).toBe("");
      });

      it("should fail because confirm password is empty", async () => {
        const { container } = renderComp();

        await clickNtab(getConfirmPasswordInput(container));

        expect(getConfirmPasswordError()).toBe("Please confirm your password");
      });

      it("should fail because confirm password does not match", async () => {
        const { container } = renderComp();

        await typeNtab(getPasswordInput(container), "password1");
        await typeNtab(getConfirmPasswordInput(container), "Pa");

        expect(getConfirmPasswordError()).toBe("Password must match");
      });
    });

    it("should successfully call submit handler function", async () => {
      const submitHandlerMock = jest.fn();

      const { container } = renderComp(false, submitHandlerMock);

      await typeNtab(getUsernameInput(container), "itspx");
      await typeNtab(getPasswordInput(container), "password123");
      await typeNtab(getConfirmPasswordInput(container), "password123");

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(() => {
        user.click(getSubmitButton());
      });

      expect(submitHandlerMock).toHaveBeenCalledTimes(1);
      expect(submitHandlerMock).toHaveBeenLastCalledWith("itspx", "password123");
    });
  });
});

const renderComp = (isLoading = false, submitHandler = () => {}) => {
  return render(<SignUpForm isLoading={isLoading} submitHandler={submitHandler} />);
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

const getSubmitButton = () => {
  return screen.queryByTestId("submit-button") as HTMLElement;
};

const getLoadingComponent = () => {
  return screen.queryByTestId("loading") as HTMLElement;
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
