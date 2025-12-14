import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPollByID, closePoll } from "../../app/features/poll/pollSlice.js";
import { useParams } from "react-router";
import { Button, Container, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";

import { emitJoinPoll, emitLeavePoll, emitCastVote } from "../../socket/emitters.js";
import notify from "../../utils/notify.js";

import PageLoader from "../../components/common/PageLoader.jsx";

const SinglePollPage = () => {
	
	const { id } = useParams();
	const dispatch = useDispatch();

	const { selectedPoll } = useSelector(state => state.polls);
	const user = useSelector(state => state.auth.user);

	// useEffect(() => {
	// 	console.log('selectedPoll :', selectedPoll);
	// }, [selectedPoll]);

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
			notify.success(poll.message);

		} catch (error) {
			
			notify.error(error);
		}
	};

	if (!selectedPoll) return <PageLoader />;

	return (
		<Container className="p-4">
			<h3 className="mb-3 h3">
				{ selectedPoll.title }
			</h3>

			{ !selectedPoll.open && <h4 className="h4 mb-3"> Verdict </h4>}

			{/* { selectedPoll.open &&  <h4 className="h4 mb-3"> Status: Poll is Active </h4> } */}

			<ListGroup className="mb-3">
				{selectedPoll.options.map((opt) => ( 
					<ListGroupItem key={opt.optionID}>
						<div className="d-flex justify-content-between alogn-items-center">
							{opt.text}

							<div className="d-flex gap-2 align-items-center">
								<strong> {opt.votes} </strong>
								<Button size="sm" onClick={() => emitCastVote(id, opt.optionID, opt._id)} disabled={!selectedPoll.open}>
									Vote
								</Button>
							</div>
						</div>

					</ListGroupItem>
				))}
			</ListGroup>

			{user?._id === selectedPoll.userID && selectedPoll.open && (
				<Button variant="danger" onClick={close}> Close Poll </Button>
			)}
		</Container>
	);
}

export default SinglePollPage;