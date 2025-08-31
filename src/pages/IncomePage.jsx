import Income from "@/containers/IncomeContainer/Income";
import IncomeContextProvider from "@/contexts/IncomeContext";
import React from "react";

const IncomePage = () => {
  return (
    <IncomeContextProvider>
      <Income />
    </IncomeContextProvider>
  );
};

export default IncomePage;
