import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { VerifyEmailForm } from "@/components/auth";
import { verifyEmail } from "@/app/features/auth/authSlice.js";

import notify from "@/utils/notify.js";

import BackButton from "@/utils/BackButton";

const VerifyEmailPage = () => {

    const formRef = useRef();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.auth);

    const handleVerifyEmail = async (data) => {
        try {
            await dispatch(verifyEmail(data)).unwrap();
            
            notify.success("E-mail verified");
            navigate('/create-account');
        } catch (error) {
            
            const msg = error || "Otp verification Failed";
            notify.error(msg);
        }
    };

    const handleError = (errors) => {
        if (import.meta.env.DEV) console.log("Verify-Otp Form errors :", errors);
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px" }}>
                        <CardBody>
                            <CardTitle className="text-center h1"> <h2> Verify E-Mail </h2> </CardTitle>
                            <VerifyEmailForm 
                                ref={formRef}
                                onSubmit={handleVerifyEmail}
                                onError={handleError}
                                loading={loading} />
                            <div className="mt-4"> <BackButton /> </div>
                            {/* <Link to={'/create-account'}> create account </Link> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VerifyEmailPage;