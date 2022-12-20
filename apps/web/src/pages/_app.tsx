import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";
import i18nextConfig from "../../next-i18next.config";

import { QueryClientProvider } from "react-query";
import queryClient from "../utilities/queryClient";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          containerId="toast-container"
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
      </Layout>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App, i18nextConfig);
