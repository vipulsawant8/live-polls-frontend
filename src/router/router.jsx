import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "@/layout/AppLayout.jsx";
import PublicLayout from "@/layout/PublicLayout.jsx";
import AuthLayout from "@/layout/AuthLayout.jsx";

import PageLoader from "@/components/common/PageLoader.jsx";

const LoginPage = lazy(() => import('@/pages/auth/LoginPage.jsx'));


const RegisterEmailPage = lazy(() => import('@/pages/auth/RegisterEmailPage.jsx'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage.jsx'));
const CreateUserAccountPage = lazy(() => import('@/pages/auth/CreateUserAccountPage.jsx'));

const PollListPage = lazy(() => import('@/pages/polls/PollsListPage.jsx'));
const SinglePollPage = lazy(() => import("@/pages/polls/SinglePollPage.jsx"));

import NotFound from "@/pages/NotFound.jsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <Suspense fallback={<PageLoader />}> <LoginPage /> </Suspense>
			},
			{
				element: <PublicLayout />,
				children: [
					{
						path: "login",
						element: <Suspense fallback={<PageLoader />}> <LoginPage /> </Suspense>
					},
					{
						path: "register-email",
						element: <Suspense fallback={<PageLoader />}> <RegisterEmailPage /> </Suspense>
					},
					{
						path: "verify-email",
						element: <Suspense fallback={<PageLoader />}> <VerifyEmailPage /> </Suspense>
					},
					{
						path: "create-account",
						element: <Suspense fallback={<PageLoader />}> <CreateUserAccountPage /> </Suspense>
					}
				]
			},
			{
				element: <AuthLayout />,
				children: [
					{
						path: 'polls',
						element: <Suspense fallback={<PageLoader />}> <PollListPage /> </Suspense>
					},
					{
						path: 'polls/:id',
						element: <Suspense fallback={<PageLoader />}> <SinglePollPage /> </Suspense>
					}
				]
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]);

export default router;