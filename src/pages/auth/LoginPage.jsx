import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row, CardHeader, CardFooter } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { LoginForm } from "@/components/auth";
import { loginUser } from "@/app/features/auth/authSlice.js";

import notify from "@/utils/notify.js";

const LoginPage = () => {

	const formRef = useRef();
	const { loading, isAuthenticated } = useSelector((state) => state.auth);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (data) => {
		try {
			
			await dispatch(loginUser(data)).unwrap();
			
			notify.success("Login Successful");

			formRef.current.resetForm();
		} catch (error) {

			const msg = error || "Login failed. Please check your credentials and try again.";
			notify.error(msg);
		}
	};

	const handleError = (errors) => {

		if (import.meta.env.DEV) console.log("Login Form errors :", errors);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/polls', { replace: true });
		}}, [isAuthenticated, navigate]);

	return (
		<Container className="py-4">
			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={6} lg={4}>
					<Card className="p-3 shadow-sm">
						<CardBody>
							{/* <CardHeader> */}
								<CardTitle className="text-center h1"> <h1> Login Page </h1> </CardTitle>
							{/* </CardHeader> */}
							{/* <CardFooter> */}
								<LoginForm 
									ref={formRef}
									onSubmit={handleLogin}
									onError={handleError}
									loading={loading}
								/>
								<div className="mt-4"> New user? click <Link to={'/register-email'}> here </Link> to register.</div>
							{/* </CardFooter> */}
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginPage;