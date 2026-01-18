import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPollByID, closePoll } from "@/app/features/poll/pollSlice.js";
import { useParams } from "react-router";
import { Button, Container, ListGroup, ListGroupItem, Spinner, Stack, Row, Col, Badge } from "react-bootstrap";

import { emitJoinPoll, emitLeavePoll, emitCastVote } from "@/socket/emitters.js";
import notify from "@/utils/notify.js";

import PageLoader from "@/components/common/PageLoader.jsx";

const SinglePollPage = () => {
	
	const { id } = useParams();
	const dispatch = useDispatch();

	const { selectedPoll } = useSelector(state => state.polls);
	const user = useSelector(state => state.auth.user);

  const [isAuthor, setisAuthor] = useState(false);

	useEffect(() => {

		if (selectedPoll) {
			if (selectedPoll.userID === user._id) {
		
				setisAuthor(true);
			} else if (selectedPoll.userID !== user._id) {

				setisAuthor(false);
			}
		}
	}, [selectedPoll]);

	useEffect(() => {

		dispatch(getPollByID(id));
	}, [id]);

	useEffect(() => {

		emitJoinPoll(id);

		return () => {
			
			emitLeavePoll(id);
		};
	}, [id]);

	const close = async () => {

		try {
			const poll = await dispatch(closePoll(id)).unwrap();
			notify.success(`Poll "${selectedPoll.title}" closed`);

		} catch (error) {
			
			notify.error(error);
		}
	};

	if (!selectedPoll) return <PageLoader />;

	return (
	<Container className="py-4">
		<div className="mx-auto" style={{ maxWidth: 720 }}>
			<h5 className="fw-semibold mb-3 text-center text-md-start">
				{selectedPoll.title}
			</h5>

			{ !selectedPoll.open && <Badge bg="secondary" className="mb-3 d-inline-block"> Poll Closed </Badge> }

			<ListGroup className="mb-4">
				{selectedPoll.options.map((opt) => (
					<ListGroup.Item
						key={opt.optionID}
						className="py-3">
							<Stack
								direction="horizontal"
								gap={3}
								className="flex justify-content-between">
								<div className="flex-grow text-break min-w-0">
									{opt.text}
								</div>

								<Stack direction="horizontal" gap={2} className="flex-shrink-0">
									<strong>{opt.votes}</strong>
									
									<Button
										size="sm"
										onClick={() =>
										emitCastVote(id, opt.optionID, opt._id)
										}
										disabled={!selectedPoll.open}>
											Vote
									</Button>
								</Stack>
							</Stack>
					</ListGroup.Item>
				))}
			</ListGroup>

			{isAuthor && selectedPoll.open && (
				<div className="mt-3">
					<Button variant="danger" onClick={close}>
						Close Poll
					</Button>
				</div>
			)}
		</div>
	</Container>
	);
}

export default SinglePollPage;