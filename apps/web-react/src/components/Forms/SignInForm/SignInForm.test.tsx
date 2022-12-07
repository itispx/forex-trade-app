import { screen, act } from "@testing-library/react";
import { render, typeNtab, clickNtab } from "../../../utilities/testing";
import user from "@testing-library/user-event";

import SignInForm from ".";

describe("sign in form", () => {
  describe("sign in form render", () => {
    it("should render username input", () => {
      const { container } = renderComp();

      expect(getUsernameInput(container)).toBeInTheDocument();
    });

    it("should render password input", () => {
      const { container } = renderComp();

      expect(getPasswordInput(container)).toBeInTheDocument();
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
    });

    it("should successfully call submit handler function", async () => {
      const submitHandlerMock = jest.fn();

      const { container } = renderComp(false, submitHandlerMock);

      await typeNtab(getUsernameInput(container), "itspx");
      await typeNtab(getPasswordInput(container), "password123");

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
  return render(<SignInForm isLoading={isLoading} submitHandler={submitHandler} />);
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
