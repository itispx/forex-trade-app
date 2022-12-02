import React from "react";

import { Routes, Route } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import DashboardPage from "../pages/DashboardPage";
import ExchangesPage from "../pages/ExchangesPage";

const Layout: React.FC = () => {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/exchanges" element={<ExchangesPage />} />
      </Routes>
    </>
  );
};

export default Layout;
