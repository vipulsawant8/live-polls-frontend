import { RouterProvider } from "react-router-dom";
import router from "@/router/router.jsx";
import { AuthInitializer } from "@/components/auth";
import '@/App.css'
import { useEffect } from "react";
import { setLogoutHandler } from "@/app/logoutHandler";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import SocketProvider from "@/socket/SocketProvider";

function App() {
	
	const dispatch = useDispatch();

	useEffect(() => {
		setLogoutHandler(() => {
			dispatch(logoutUser());
		});
	}, [dispatch]);

	return ( <>
		<AuthInitializer />
		<SocketProvider />
		<RouterProvider router={router} />
		<ToastContainer position="top-right" autoClose={1500} /> 
	</> );
};

export default App;