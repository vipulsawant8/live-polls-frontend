import POLL_EVENTS from "@/socket/events.js";
import { getSocket } from "@/socket/socket.js";

const emitJoinPoll = (pollID) => {

	const socket = getSocket();
	if (socket?.connected) {
		socket.emit(POLL_EVENTS.JOIN_POLL, { pollID });
	}
};

const emitLeavePoll = (pollID) => {

	const socket = getSocket();

	if (socket?.connected) {
		socket.emit(POLL_EVENTS.LEAVE_POLL, { pollID });
	}
};

const emitCastVote = (pollID, optionID, optionDocID) => {

	const socket = getSocket();

	if (socket?.connected) {
		socket.emit(POLL_EVENTS.CAST_VOTE, { pollID, optionDocID, optionID });
	}
};

const emitAddPoll = (poll) => {
	const socket = getSocket();
	if (socket?.connected){
		socket.emit(POLL_EVENTS.ADD_POLL, { poll });
	}
}

const emitClosePoll = (poll) => {
	const socket = getSocket();
	if (socket?.connected){
		socket.emit(POLL_EVENTS.CLOSE_POLL, { poll });
	}
}

export { emitJoinPoll, emitLeavePoll, emitCastVote, emitAddPoll, emitClosePoll };