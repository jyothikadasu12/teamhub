
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./app";
import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeesPage";
import DocumentsPage from "../pages/DocumentsPage";
import ReportsPage from "../pages/ReportsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "employees",
        element: <EmployeesPage />,
      },
      {
        path: "documents",
        element: <DocumentsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
