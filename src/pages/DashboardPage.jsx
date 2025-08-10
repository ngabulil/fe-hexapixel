import Dashboard from "@/containers/DashboardContainer/Dashboard";
import DashboardContextProvider from "@/contexts/DashboardContext";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardContextProvider>
      <Dashboard />
    </DashboardContextProvider>
  );
};

export default DashboardPage;
