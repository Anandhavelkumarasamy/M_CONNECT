import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Screens/LoginScreen/Login";
import { AuthPrivate, HomePrivate } from "./PrivateRouter";
import Navbar from "../SharedComponents/Navbar";
import DashBoard from "../Screens/HomeScreen/DashBoard";
import FailureAnalysis from "../Screens/HomeScreen/Report/FailureAnalysis";
import NotificationReport from "../Screens/HomeScreen/Report/NotificationReport";
import HistoryReport from "../Screens/HomeScreen/Report/HistoryReport";

export default function RoutingPath() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthPrivate />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <HomePrivate />,
      children: [
        {
          path: "navbar",
          element: <Navbar />,
          children: [
            {
              path: "dashboard",
              element: <DashBoard />,
            },
            {
              path: "failureanalysis",
              element: <FailureAnalysis />,
            },
            {
              path: "notificationreport",
              element: <NotificationReport />,
            },
            {
              path: "historyreport",
              element: <HistoryReport />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
