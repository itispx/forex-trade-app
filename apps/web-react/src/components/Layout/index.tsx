import React from "react";

import { Routes, Route } from "react-router-dom";

import MainNavigation from "../MainNavigation";
import DashboardPage from "../../pages/DashboardPage";
import ExchangesPage from "../../pages/ExchangesPage";

const Layout: React.FC = () => {
  return (
    <div data-testid="layout">
      <MainNavigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/exchanges" element={<ExchangesPage />} />
      </Routes>
    </div>
  );
};

export default Layout;
