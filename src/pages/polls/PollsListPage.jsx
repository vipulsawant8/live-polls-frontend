import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls, selectAllPolls } from "@/app/features/poll/pollSlice.js";
import { Link } from "react-router";
import { Card, CardBody, Row, Col, CardTitle, Container, Button, Badge, } from "react-bootstrap";
import { Person, Award } from "react-bootstrap-icons";

import AddPoll from "@/components/poll/AddPoll.jsx";

const PollsListPage = () => {

	const pollRef = useRef();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const polls = useSelector(selectAllPolls);
	const [adding, setAdding] = useState(false);

	const onHide = () => {

		setAdding(false);
	};

	useEffect(() => {

		dispatch(fetchPolls());
	}, [dispatch]);

	return (
		<Container className="p-4">
			<Row>
				<Col className="d-flex justify-content-end">
					<Button onClick={()=> setAdding(true)}> Add Poll </Button>
				</Col>
			</Row>
			
			<AddPoll ref={pollRef} onHide={onHide} show={adding}  />
			
			<h3 className="mb-3">
				Live Polls
			</h3>

			{polls && polls.length === 0 && <p> No Polls Active </p>}
			{polls && polls.length > 0 && <Row xs={1} md={2} lg={3} className="g-3">
				{ polls.map((poll) => (
					<Col key={poll._id}>
						<Card>
							<CardBody>
								<CardTitle> {poll.title} </CardTitle>
								{/* <div className="mb-2 small text-muted"> Options: {poll.options.length} </div> */}
								{/* <div className="mb-2 small text-muted"> <Badge bg={poll.open ? "success" : "danger"} className="mb-3 d-inline-block"> {poll.open ? "Open" : "Closed"} </Badge> </div> */}
								{/* <div className="mb-2 small text-muted"> Autor: {poll.author._id === user._id ? "You": poll.
								author.name} </div> */}
								
								<div className="d-flex flex-column justify-content-start align-items-start">
									<Badge bg={poll.open ? "success" : "danger"} className="m-1 d-flex align-items-center"> {poll.open ? "Open" : "Closed"} </Badge>

									<Badge bg={poll.author._id === user._id ? "warning":"primary"} pill className="m-1 d-flex align-items-center gap-1">
										{ poll.author._id === user._id ? (<><Award size={14} /> You</>) : (<><Person /> {poll.author.name}</>) }			
									</Badge>

									<Link to={`/polls/${poll._id}`} className="btn btn--primary btn-sm"> View </Link>
								</div>

								

								{/* {poll.author._id === user._id && <Badge bg="warning" pill className="ms-2 d-flex align-items-center gap-1 flex-grow-0">
									<Award size={14} />
									You
								</Badge>} */}

								{/* {poll.author._id !== user._id && <Badge bg="primary" text="dark" pill className="ms-2 d-flex align-items-center gap-1">
									<Person size={14} />
									{poll.author.name}
								</Badge>} */}

								{/* <Badge bg={"info"} className="ms-2"> {poll.author._id === user._id ? "You": poll.author.name} </Badge> */}
							</CardBody>
						</Card>
					</Col>
				)) }
			</Row>}

		</Container>
	);
};

export default PollsListPage;