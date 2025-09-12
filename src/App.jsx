import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import MainLayoutContextProvider from "./contexts/MainLayoutContext";
import ProfilePage from "./pages/ProfilePage";
import IncomePage from "./pages/IncomePage";
import OutcomePage from "./pages/OutcomePage ";
import UserPage from "./pages/UserPage";
import InfoPage from "./pages/InfoPage";
import MonthlyReportPDF from "./components/main/MonthlyReportPDF";
import Test from "./pages/Test";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <MainLayoutContextProvider>
        <MainLayout />
      </MainLayoutContextProvider>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/income",
        element: <IncomePage />,
      },
      {
        path: "/outcome",
        element: <OutcomePage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/info",
        element: <InfoPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
