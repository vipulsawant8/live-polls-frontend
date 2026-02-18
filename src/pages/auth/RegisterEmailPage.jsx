import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RegisterEmailForm } from "@/components/auth";
import { registerEmail } from "@/app/features/auth/authSlice.js";

import notify from "@/utils/notify.js";

const RegisterEmailPage = () => {

    const formRef = useRef();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);
    const handleRegisterEmail = async (data) => {
        try {
            await dispatch(registerEmail(data)).unwrap();
            
            notify.success("Otp Sent");
            navigate('/verify-email');
        } catch (error) {
            
            const msg = error || "Otp send Failed";
            notify.error(msg);
        }
    };

    const handleError = (errors) => {
        if (import.meta.env.DEV) console.log("Register-Email Form errors :", errors);
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px" }}>
                        <CardBody>
                            <CardTitle className="text-center h1"> <h1> Register E-Mail </h1> </CardTitle>
                            <RegisterEmailForm 
                                ref={formRef}
                                onSubmit={handleRegisterEmail}
                                onError={handleError}
                                loading={loading} />
                            <div className="mt-4"> Already User? click <Link to={'/login'}> here </Link> to login.</div>
                            {/* <Link to={'/verify-email'}>verify otp</Link> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterEmailPage;