import React, { useState } from "react";

import MainNavigation from "../components/MainNavigation";
import DashboardPage from "../pages/DashboardPage";

const Layout: React.FC = () => {
  return (
    <>
      <MainNavigation />
      <DashboardPage />
    </>
  );
};

export default Layout;
