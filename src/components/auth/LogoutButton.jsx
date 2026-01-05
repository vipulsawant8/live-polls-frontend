import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/features/auth/authSlice.js";
import { Button } from "react-bootstrap";

import notify from "@/utils/notify.js";

const LogoutButton = () => {

	const dispatch = useDispatch();

	const handleLogout = async () => {

		try {
			
			await dispatch(logoutUser()).unwrap();
			notify.success("Logout successfull");
		} catch (error) {
			
			const msg = error || "Logout failed. Please try again.";
			notify.error(msg);
		}
	};

  return (
	<Button variant="outline-danger" size="sm" onClick={handleLogout}> Logout </Button>
  );
};

export default LogoutButton;