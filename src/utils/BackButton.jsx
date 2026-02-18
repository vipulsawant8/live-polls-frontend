import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackButton = () => {

    const navigate = useNavigate();

    const handleBack = () => {

        navigate(-1);
    };

    return (
        <Button className="btn btn-primary text-white" onClick={handleBack}> Back </Button>
    );
};

export default BackButton;