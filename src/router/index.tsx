import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import {lazyLoad} from'./lazyLoad';
import {Login} from "../views/login"
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
    {
        // element: <Layout />,
        // children: [
        //     {
        //         path: '/roleList',
        //         element: lazyLoad(lazy(() => import('../views/role'))),
        //     },
        // ],
    },
    { path: '/', element: <Navigate to="/admin" /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> },
]);
export default router;
