import * as yup from "yup";
import CustomForm from "@/components/form/CustomForm.jsx";

const CreateUserAccount = ({ onSubmit, onError, loading, ref }) => {
	
	const fields = [
			{
				name: "name",
				label: "Name",
				type: "text"
			},
			{
				name: "password",
				label: "Password",
				type: "password",
				autoComplete: "new-password"
			}
		];
	
	const schema = yup.object({
		name: yup.string().required(),
		password: yup.string().min(6).required()
	});
	
	return ( <CustomForm 
		ref={ref}
		fields={fields}
		validationSchema={schema}
		submitLabel={loading ? "Signing up..." : "Sign-Up"}
		onSubmit={onSubmit}
		onError={onError}
		name="CreateUserAccountForm" /> );
};

export default CreateUserAccount;