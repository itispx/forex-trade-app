import React from "react";
import MainNavigation from "../components/MainNavigation";

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html>
      <head></head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
