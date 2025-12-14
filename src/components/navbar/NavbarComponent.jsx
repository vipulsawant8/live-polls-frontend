import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap"
import { useSelector } from "react-redux";
import { LogoutButton } from "@/components/auth";

const NavbarComponent = () => {

	const user = useSelector(state => state.auth.user);

	if (!user) return;

  return (
	<Navbar bg="dark" expand="lg" className="mb-3 shadow-sm">
		<Container fluid>
			<NavbarBrand style={{fontWeight: 600}} className="text-light"> Live Poll </NavbarBrand>
			<Nav className="ms-auto align-items-center gap-3">
				<span className="text-light font-bold"> {user.email} </span> && <LogoutButton />
				
			</Nav>
		</Container>
	</Navbar>
  );
}

export default NavbarComponent;