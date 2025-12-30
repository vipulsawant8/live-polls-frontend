import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  
	const { isAuthenticated, loading } = useSelector(state => state.auth);

	if (loading) return null;	

	if (!isAuthenticated) return <Navigate to={'/login'} replace />;

	return <Outlet />;
}

export default AuthLayout;