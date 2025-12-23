import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap"
import { useSelector } from "react-redux";
import { LogoutButton } from "@/components/auth";
import { Link } from "react-router-dom";

const NavbarComponent = () => {

	const user = useSelector(state => state.auth.user);

	if (!user) return;

  return (
	<Navbar bg="dark" variant="dark" expand="lg" className="mb-3 shadow-sm">
		<Container fluid>
			<NavbarBrand className="fw-semibold" as={Link} to="/polls"> Live Poll </NavbarBrand>
			<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav  className="ms-lg-auto">
						<Nav.Item> <LogoutButton /> </Nav.Item>
					</Nav>
				</Navbar.Collapse>
		</Container>
	</Navbar>
  );
}

export default NavbarComponent;