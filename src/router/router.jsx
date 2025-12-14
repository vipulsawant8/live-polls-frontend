import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "@/layout/AppLayout.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";

import PageLoader from "@/components/common/PageLoader.jsx";

const LoginPage = lazy(() => import('@/pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage.jsx'));

const PollListPage = lazy(() => import('@/pages/polls/PollsListPage.jsx'));
const SinglePollPage = lazy(() => import("@/pages/polls/SinglePollPage.jsx"));

import NotFound from "@/pages/NotFound.jsx";

import NavbarComponent from "../components/navbar/NavbarComponent.jsx";

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <Navigate to={'/login'} replace />
			},
			{
				element:<> <NavbarComponent /> <AppLayout /> </>,
				children: [
					{
						path: "login",
						element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>
					},
					{
						path: "register",
						element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>
					},
					{
						path: '*',
						element: <NotFound />
					}
				]
			},
			{
				element: <> <NavbarComponent /> <AuthLayout /> </>,
				children: [
					{
						path: 'polls',
						element: <Suspense fallback={<PageLoader />}> <PollListPage /> </Suspense>
					},
					{
						path: "polls/:id",
						element: <Suspense fallback={<PageLoader />}> <SinglePollPage /> </Suspense>
					}
				]
			},
		]
	}
]);

export default router;