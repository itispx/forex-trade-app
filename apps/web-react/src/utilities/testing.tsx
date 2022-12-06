import React from "react";
import { render, RenderOptions } from "@testing-library/react";

// Providers
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper, ...options });
};

export { customRender as render };
