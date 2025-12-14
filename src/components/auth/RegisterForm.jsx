import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";

const RegisterForm = ({ onSubmit, onError, loading, ref }) => {
	
	const fields = [
			{
				name: "name",
				label: "Name",
				type: "text"
			},
			{
				name: "email",
				label: "E-mail",
				type: "email"
			},
			{
				name: "password",
				label: "Password",
				type: "password"
			}
		];
	
	const schema = yup.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).required()
	});
	
	return ( <CustomForm 
		ref={ref}
		fields={fields}
		validationSchema={schema}
		submitLabel={loading ? "Registering..." : "Register"}
		onSubmit={onSubmit}
		onError={onError}
		name="loginForm" /> );
};

export default RegisterForm;