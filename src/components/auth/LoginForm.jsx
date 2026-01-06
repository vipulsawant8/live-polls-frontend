import { forwardRef } from "react";
import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";

const LoginForm = forwardRef(({ onSubmit, onError, loading }, ref ) => {

	const fields = [
		{
			name: "identity",
			label: "E-mail",
			type: "email",
			autoComplete: "email"
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			autoComplete: "current-password"
		}
	];

	const schema = yup.object({
		identity: yup.string().email().required(),
		password: yup.string().required()
	});

  	return ( <CustomForm 
		ref={ref}
		fields={fields}
		validationSchema={schema}
		submitLabel={loading ? "Logging in..." : "Login"}
		onSubmit={onSubmit}
		onError={onError}
		name="loginForm" /> );
});

export default LoginForm;