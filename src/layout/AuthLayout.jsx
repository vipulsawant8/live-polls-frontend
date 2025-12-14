import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  
	const { user, loading } = useSelector(state => state.auth);

	if (loading) return null;	

	if (!user) return <Navigate to={'/login'} replace />;

	return <Outlet />;
}

export default AuthLayout;