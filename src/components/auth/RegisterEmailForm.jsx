import { forwardRef, useEffect } from "react";
import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";
import { useSelector } from "react-redux";

const RegisterEmailForm = forwardRef(({ onSubmit, onError, loading }, ref ) => {

    const email = useSelector(state => state.auth.registration.email);
    useEffect(() => {
        if (import.meta.DEV) console.log("email :", email);
    }, [email]);

    const fields = [
        {
            name: "email",
            label: "E-mail",
            type: "email",
            autoComplete: "email"
        }
    ];

    const schema = yup.object({
        email: yup.string().email().required()
    });

    return ( <CustomForm 
        ref={ref}
        fields={fields}
        validationSchema={schema}
        submitLabel={loading ? "Sending otp..." : "Send-Otp"}
        onSubmit={onSubmit}
        onError={onError}
        defaultValues={{email}}
        name="RegisterEmailForm" /> );
});

export default RegisterEmailForm;