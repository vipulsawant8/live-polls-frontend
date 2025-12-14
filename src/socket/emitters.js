import POLL_EVENTS from "./events.js";
import { getSocket } from "./socket.js";

const emitJoinPoll = (pollID) => {

	const socket = getSocket();
	if (socket?.connected) {
		
		socket.emit(POLL_EVENTS.JOIN, { pollID });
	}
};

const emitLeavePoll = (pollID) => {

	const socket = getSocket();

	if (socket?.connected) {
		
		socket.emit(POLL_EVENTS.LEAVE, { pollID });
	}
};

const emitCastVote = (pollID, optionID, optionDocID) => {

	const socket = getSocket();

	if (socket?.connected) {
		
		socket.emit(POLL_EVENTS.CAST_VOTE, { pollID, optionDocID, optionID });
	}
};

export { emitJoinPoll, emitLeavePoll, emitCastVote };