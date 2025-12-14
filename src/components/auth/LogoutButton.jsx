import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/features/auth/authSlice.js";
import { Button } from "react-bootstrap";

const LogoutButton = () => {

	const dispatch = useDispatch();

	const handleLogout = async () => {

		try {
			
			const logout = await dispatch(logoutUser()).unwrap();
		} catch (error) {
			
			window.alert(error || "Logout failed. Please try again.");
		}
	};

  return (
	<Button variant="outline-danger" size="sm" onClick={handleLogout}> Logout </Button>
  );
};

export default LogoutButton;