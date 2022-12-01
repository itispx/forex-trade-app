import React from "react";

import { QueryClientProvider } from "react-query";
import queryClient from "../utilities/queryClient";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../Layout";

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Layout />
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
      </QueryClientProvider>
    </div>
  );
};

export default App;
