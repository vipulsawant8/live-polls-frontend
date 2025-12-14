import * as yup from "yup";
import { Row, Col, Card, CardBody, CardTitle } from "react-bootstrap";
import CustomForm from "../form/CustomForm.jsx";
import { useDispatch } from "react-redux";
import { createPoll } from "../../app/features/poll/pollSlice.js";
import { useRef } from "react";
import notify from "../../utils/notify.js";

const AddPoll = () => {

	const addPollRef = useRef();
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
			const poll = await dispatch(createPoll({ title: data.title.trim(), options })).unwrap();
			notify.success(poll.message);
			addPollRef.current.resetForm();
		} catch (error) {

			console.log("error :", error);
			notify.error(error);
		}
	};

	const handleError = errs => {
		console.log("errors :", errs);
	}

	return (
		<Row className="justify-content-start mb-2">
			<Col xs={12} sm={10} md={8} lg={6}>
				<Card className="p-3 border-0">
					<CardBody>
						<CardTitle className="h4"> <h4> Create Poll </h4> </CardTitle>
						<CustomForm ref={addPollRef} fields={fields} defaultValues={{title: '', options: ''}} validationSchema={schema} onSubmit={handleCreate} submitLabel="Create Poll" name="AddPoll" onError={handleError} />
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default AddPoll;