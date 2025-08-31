import Outcome from "@/containers/OutcomeContainer/Outcome";
import OutcomeContextProvider from "@/contexts/OutcomeContext";
import React from "react";

const OutcomePage = () => {
  return (
    <OutcomeContextProvider>
      <Outcome />
    </OutcomeContextProvider>
  );
};

export default OutcomePage;
