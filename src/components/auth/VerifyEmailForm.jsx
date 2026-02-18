import { forwardRef } from "react";
import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";

const VerifyEmailForm = forwardRef(({ onSubmit, onError, loading }, ref ) => {

    const fields = [
        {
            name: "otp",
            label: "Otp",
            type: "text"
        }
    ];

    const schema = yup.object({
        otp: yup.string().required(" Please enter Otp")
    });

    return ( <CustomForm 
        ref={ref}
        fields={fields}
        validationSchema={schema}
        submitLabel={loading ? "verifing otp..." : "Verify-Otp"}
        onSubmit={onSubmit}
        onError={onError}
        name="VerifyEmailForm" /> );
});

export default VerifyEmailForm;