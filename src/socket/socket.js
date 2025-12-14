import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";
let socket;

const socketOptions = {
	withCredentials: true,
	autoConnect: false,
	transports: ["websocket"],
	reconnectionAttempts: 5
};

const initSocket = () => {

	if (socket || socket?.connected) return socket;

	socket = io(SOCKET_URL, socketOptions);
	socket.connect();
	return socket;
};

const getSocket = () => socket;

const disconnectSocket = () => {

	if (socket.connected) {
		
		socket.disconnect();
		return socket = null;
	}
};

export { getSocket, initSocket, disconnectSocket };