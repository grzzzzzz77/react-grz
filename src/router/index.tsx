import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { lazyLoad } from "./lazyLoad";
import { Login } from "@/views/login";
import NotFound from "../views/NotFound";
import LayoutCom from "@/layout";
// import Home from "../views/admin/home";
import { getAllCategory } from "@/api/demoTest";
import { keepAliveTransfer } from "../KeepAlive";

import Form from "@/views/admin/form";
import Home from "@/views/admin/home";

const HomeView = keepAliveTransfer(Home, "home");
const FormView = keepAliveTransfer(Form, "form");

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutCom />,
    children: [
      {
        path: "home",
        element: <HomeView />,
      },
      {
        path: "user",
        element: lazyLoad(lazy(() => import("../views/admin/user"))),
        loader: async () => {
          const res = await getAllCategory("武汉大学");
          return res;
        },
      },
      {
        path: "test",
        element: lazyLoad(lazy(() => import("../views/admin/test"))),
      },
      {
        path: "form",
        element: <FormView />,
      },
    ],
  },
  { path: "/", element: <Navigate to="/admin/home" /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
]);
export default router;
