import POLL_EVENTS from "@/socket/events.js";
import { socketUpdatePoll, voteAcceptedMessage, voteRejectedMessage } from "@/app/features/poll/pollSlice.js";
import notify from "@/utils/notify.js";

const registerPollReceivers = (socket, dispatch) => {

	if (!socket) return;

	socket.on(POLL_EVENTS.POLL_DATA, ({ poll }) => {

		dispatch(socketUpdatePoll(poll));
	});

	socket.on(POLL_EVENTS.VOTE_ACCEPTED, ({ message }) => {

		dispatch(voteAcceptedMessage(message || "Vote Counted"));
		notify.success(message || "Vote Counted!")
	});

	socket.on(POLL_EVENTS.VOTE_REJECTED, ({ message }) => {

		dispatch(voteRejectedMessage(message || "Vote Rejected"));
		notify.error(message || "Vote Rejected");
	});
};

const unregisteredPollReceivers = (socket) => {

	if (!socket) return;

	socket.off(POLL_EVENTS.POLL_DATA);
	socket.off(POLL_EVENTS.VOTE_ACCEPTED);
	socket.off(POLL_EVENTS.VOTE_REJECTED);
};

export { registerPollReceivers, unregisteredPollReceivers };