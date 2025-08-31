import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <TooltipProvider delayDuration={0}>
    <App />
  </TooltipProvider>
);
