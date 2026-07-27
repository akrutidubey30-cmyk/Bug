import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import DashboardLayout from "../layouts/DashboardLayout";
import AllBugsPage from "../pages/AllBugsPage";
import BugDetailsPage from "../pages/BugDetailsPage";
import SettingsPage from "../pages/SettingsPage";
import LoginPage from "../pages/LoginPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import ProtectedRoute from "../components/ProtectedRoute";
import EditBugPage from "../pages/EditBugPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create-account",
    element: <CreateAccountPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "bugs",
            element: <AllBugsPage />,
          },
          {
            path: "bugs/:bugId",
            element: <BugDetailsPage />,
          },
          {
            path: "bugs/:bugId/edit",
            element: <EditBugPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
