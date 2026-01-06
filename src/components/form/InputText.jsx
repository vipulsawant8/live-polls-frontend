import { FormControl, FormLabel } from "react-bootstrap";

const InputText = ({ field, register }) => {
	return (
		<>
			{field.label && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}
			<FormControl 
				type={field.type} 
				placeholder={field.placeholder}
				id={field.name}
				autoComplete={field.autoComplete}
				{...register(field.name)} />
		</>
	);	
};

export default InputText;