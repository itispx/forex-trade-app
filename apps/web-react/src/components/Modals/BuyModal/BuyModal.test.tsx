import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../../utilities/testing";

import BuyModal from ".";

import { IExchangeConversion } from "interfaces-common";

describe("buy modal component", () => {
  const exchangeInfo: IExchangeConversion = {
    base: "GBP",
    converted: "USD",
    exchangeRate: 0.5,
  };

  const handleClose = jest.fn();

  describe("modal visibility", () => {
    it("should have title", () => {
      render(<BuyModal show={true} close={handleClose} exchangeInfo={exchangeInfo} />);

      const title = screen.getByText("Buy");

      expect(title).toBeVisible();
    });

    it("should be visible", () => {
      render(<BuyModal show={true} close={handleClose} exchangeInfo={exchangeInfo} />);

      const modal = screen.getByTestId("buy-modal");

      expect(modal).toBeVisible();
    });

    it("should not visible", () => {
      render(<BuyModal show={false} close={handleClose} exchangeInfo={exchangeInfo} />);

      const modal = screen.queryByTestId("buy-modal");

      expect(modal).toBe(null);
    });

    it("should close modal", () => {
      render(<BuyModal show={true} close={handleClose} exchangeInfo={exchangeInfo} />);

      const modal = screen.queryByTestId("buy-modal");

      if (modal) {
        fireEvent.keyDown(modal, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          charCode: 27,
        });
      }

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("display values", () => {
    it("should render the currencies display", () => {
      render(<BuyModal show={true} close={handleClose} exchangeInfo={exchangeInfo} />);

      const cd = screen.getByTestId("currencies-display").textContent;

      expect(cd).toBe(`${exchangeInfo.base} > ${exchangeInfo.converted} =`);
    });

    it("should render the correct total amount", () => {
      render(<BuyModal show={true} close={handleClose} exchangeInfo={exchangeInfo} />);

      const tm = screen.getByTestId("total-amount").textContent;

      expect(tm).toBe((1 * 0.5).toString());
    });
  });
});
