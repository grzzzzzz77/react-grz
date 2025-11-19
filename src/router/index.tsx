import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { lazyLoad } from "./lazyLoad";
import { Login } from "@/views/login";
import NotFound from "../views/NotFound";
import LayoutCom from "@/layout";
// import Home from "../views/admin/home";

const router = createBrowserRouter([
  {
    element: <LayoutCom />,
    children: [
      {
        path: "/admin/home",
        element: lazyLoad(lazy(() => import("../views/admin/home"))),
      },
    ],
  },
  { path: "/", element: <Navigate to="/admin/home" /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);
export default router;
