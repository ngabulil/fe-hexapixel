import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayout from './layout/MainLayout'
import DashboardPage from './pages/DashboardPage'

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App