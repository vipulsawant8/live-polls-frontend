import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row, CardHeader, CardFooter } from "react-bootstrap";

import { registerUser, loginUser } from "@/app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";

const RegisterPage = () => {

	const formRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);

	const handleRegister = async (data) => {
		
		try {
			await dispatch(registerUser(data)).unwrap();

			const payload = { identity: data.email, password: data.password };

			window.alert("Registration successful! Logging you in...");

			await dispatch(loginUser(payload)).unwrap();

			formRef.current.resetForm();

			navigate('/polls', { replace: true });
		} catch (error) {
			
			window.alert(error || "Registration failed. Please try again.");
		}
	};

	const handleError = (errors) => {
		console.log("Register Form errors :", errors);
	};

	return (
		<Container className="py-4">
			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={6} lg={4}>
					<Card className="p-3 shadow-sm">
						<CardBody>
							<CardHeader>
								<CardTitle className="text-center h1"> <h1> Register Page </h1> </CardTitle>
							</CardHeader>
							<CardFooter>
								
								<RegisterForm 
									ref={formRef}
									onSubmit={handleRegister}
									loading={loading}
									onError={handleError}
									/>
								<div className="mt-4"> Already user? click <Link to={'/login'}> here </Link> to login.</div>
							</CardFooter>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>	
	 );
};

export default RegisterPage;