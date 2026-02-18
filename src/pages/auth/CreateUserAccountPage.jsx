import { Link } from "react-router-dom";
import { CreateUserAccountForm } from "@/components/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row, CardHeader, CardFooter } from "react-bootstrap";

import { createUserAccount, loginUser } from "@/app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef } from "react";
import notify from "@/utils/notify";

import BackButton from "@/utils/BackButton";

const CreateUserAccountPage = () => {

	const formRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, isAuthenticated, registration } = useSelector((state) => state.auth);

	const handleCreateAccount = async (data) => {
			try {
				await dispatch(createUserAccount(data)).unwrap();
	
				notify.success("Account created successfully now logging you in");
	
				const payload = { identity: registration.email, password: data.password };
	
				await dispatch(loginUser(payload)).unwrap();

				notify.success("Logged-in Successfully");
	
				formRef.current.resetForm();
			} catch (error) {
				
				const msg = error || "Account Creattion Failed";
				notify.error(msg);
			}
	};

	const handleError = (errors) => {
		if (import.meta.env.DEV) console.log("Create User Account Form errors :", errors);
	};

	useEffect(() => {

		if (isAuthenticated) {

			navigate('/board', { replace: true });
		}
	}, [isAuthenticated]);

	return ( <Container className="py-4">
		<Row className="justify-content-center">
			<Col xs={12} sm={10} md={6} lg={4}>
				<Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px"  }}>
					<CardBody>
						<CardTitle className="text-center h1"> <h2> Create Account </h2> </CardTitle>
						<CreateUserAccountForm 
							ref={formRef}
							onSubmit={handleCreateAccount}
							loading={loading}
							onError={handleError} />
						<div className="mt-4"> <BackButton /> </div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container> );
};

export default CreateUserAccountPage;