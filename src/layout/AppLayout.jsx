import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const AppLayout = () => {

	return ( <> 
		<Container fluid="md" className="py-3">
			<Outlet />
		</Container>
	</> );
};

export default AppLayout;