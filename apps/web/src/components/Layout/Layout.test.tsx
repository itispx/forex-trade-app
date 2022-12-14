/* eslint-disable testing-library/no-unnecessary-act */
import { screen, act } from "@testing-library/react";
import { render } from "../../utilities/testing";

import Layout from ".";

import { useRouter, NextRouter } from "next/router";

jest.mock("next/router", () => {
  const original = jest.requireActual("next/router");
  return {
    ...original,
    useRouter: jest.fn(),
  };
});

const useRouterMocked = jest.mocked(useRouter, true);

beforeAll(() => {
  useRouterMocked.mockImplementation(() => {
    const mocked = { pathname: "/" } as NextRouter;
    return mocked;
  });
});

describe("layout", () => {
  it("should render layout", async () => {
    await act(() => {
      render(<Layout />);
    });

    const layout = screen.getByTestId("layout");

    expect(layout).toBeInTheDocument();
  });

  it("should render main navigation", async () => {
    await act(() => {
      render(<Layout />);
    });
    const nav = screen.getByTestId("main-navigation-container");

    expect(nav).toBeInTheDocument();
  });

  it("should render children", async () => {
    await act(() => {
      render(
        <Layout>
          <div data-testid="children"></div>
        </Layout>,
      );
    });

    const c = screen.getByTestId("children");

    expect(c).toBeInTheDocument();
  });
});
