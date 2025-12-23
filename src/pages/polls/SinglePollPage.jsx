import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPollByID, closePoll } from "@/app/features/poll/pollSlice.js";
import { useParams } from "react-router";
import { Button, Container, ListGroup, ListGroupItem, Spinner, Stack, Row, Col } from "react-bootstrap";

import { emitJoinPoll, emitLeavePoll, emitCastVote } from "@/socket/emitters.js";
import notify from "@/utils/notify.js";

import PageLoader from "@/components/common/PageLoader.jsx";

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
		<Container className="py-4">
  <Row className="justify-content-center">
    <Col xs={12} md={10} lg={8}>
      
      <h3 className="mb-3 text-break">
        {selectedPoll.title}
      </h3>

      {!selectedPoll.open && (
        <h5 className="mb-3 text-muted">Verdict</h5>
      )}

      <ListGroup className="mb-4">
        {selectedPoll.options.map((opt) => (
          <ListGroup.Item
            key={opt.optionID}
            className="py-3"
          >
            <Stack
              direction="horizontal"
              gap={3}
              className="flex-wrap justify-content-between"
            >
              <div className="flex-grow-1 text-break">
                {opt.text}
              </div>

              <Stack direction="horizontal" gap={2}>
                <strong>{opt.votes}</strong>
                <Button
                  size="sm"
                  onClick={() =>
                    emitCastVote(id, opt.optionID, opt._id)
                  }
                  disabled={!selectedPoll.open}
                >
                  Vote
                </Button>
              </Stack>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {user?._id === selectedPoll.userID && selectedPoll.open && (
  <div className="mt-3">
    <Button variant="danger" onClick={close}>
      Close Poll
    </Button>
  </div>
)}

    </Col>
  </Row>
</Container>
	);
}

export default SinglePollPage;