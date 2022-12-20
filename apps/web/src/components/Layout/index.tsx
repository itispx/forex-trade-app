import React from "react";

import MainNavigation from "../MainNavigation";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div data-testid="layout">
      <MainNavigation />
      {children}
    </div>
  );
};

export default Layout;
