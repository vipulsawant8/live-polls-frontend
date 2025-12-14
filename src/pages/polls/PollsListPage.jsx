import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls, selectAllPolls } from "../../app/features/poll/pollSlice.js";
import { Link } from "react-router";
import { Card, CardBody, Row, Col, CardTitle, Container } from "react-bootstrap";

import AddPoll from "../../components/poll/AddPoll.jsx";

const PollsListPage = () => {

	const dispatch = useDispatch();
	const polls = useSelector(selectAllPolls);

	useEffect(() => {

		dispatch(fetchPolls());
	}, [dispatch]);

	return (
		<Container className="p-4">
			
			<AddPoll />
			
			<h3 className="mb-3">
				Live Polls
			</h3>

			{polls.length === 0 && <p> No Polls Active </p>}
			{polls.length > 0 && <Row xs={1} md={2} lg={3} className="g-3">
				{ polls.map((poll) => (
					<Col key={poll._id}>
						<Card>
							<CardBody>
								<CardTitle> {poll.title} </CardTitle>
								<div className="mb-2 small text-muted"> Options: {poll.options.length} </div>
								<div className="mb-2 small text-muted"> Status: {poll.open ? "Open" : "Closed"} </div>
								<Link to={`/polls/${poll._id}`} className="btn btn--primary btn-sm"> View </Link>
							</CardBody>
						</Card>
					</Col>
				)) }
			</Row>}

		</Container>
	);
};

export default PollsListPage;