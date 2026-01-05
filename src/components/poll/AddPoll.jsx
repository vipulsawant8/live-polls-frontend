import * as yup from "yup";
import { Card, CardBody, Modal, ModalHeader, ModalTitle, ModalBody } from "react-bootstrap";
import CustomForm from "@/components/form/CustomForm.jsx";
import { useDispatch } from "react-redux";
import { createPoll } from "@/app/features/poll/pollSlice.js";

import notify from "@/utils/notify.js";

const AddPoll = ({ show, onHide, ref }) => {
	
	const dispatch = useDispatch();

	const fields = [
		{
			name: "title",
			label: "Question",
			type: "text",
			placeholder: "Enter Question"
		},
		{
			name: "options",
			label: "Options(1 per line) ",
			type: "textarea",
			placeholder: "Option A\nOption B\nOption C"
		},
	];

	const schema = yup.object().shape({
		title: yup.string().required(),
		options: yup.string().test("min-options", "At least 2 options required", (value) => {
			if (!value) return false;

			const lines = value.split("\n").map(s => s.trim()).filter(Boolean);
			return lines.length >=2;
		}).required()
	});

	const handleCreate = async (data) => {

		try {

			const options = data.options.split("\n").map(s => s.trim()).filter(Boolean);
			await dispatch(createPoll({ title: data.title.trim(), options })).unwrap();
			notify.success(`Poll titled ${data.title} added`);
			ref.current.resetForm();
			onHide();
		} catch (error) {

			console.log("error :", error);
			notify.error(error);
		}
	};

	const handleError = errs => {
		console.log("errors :", errs);
	}

	return (<Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
		<ModalHeader closeButton>
			<ModalTitle>Create Poll</ModalTitle>
		</ModalHeader>

		<ModalBody style={{ backgroundColor: "#f8f9fa" }}>
			<Card className="mt-4 p-3" style={{ backgroundColor: "inherit", border: "none" }}>
				<CardBody>
					<CustomForm ref={ref} fields={fields} validationSchema={schema} onSubmit={handleCreate} onError={handleError} defaultValues={{ title: "", options: "" }} submitLabel="Create-Poll" name="AddPoll" />
				</CardBody>
			</Card>
		</ModalBody>
	</Modal>
	);
};

export default AddPoll;