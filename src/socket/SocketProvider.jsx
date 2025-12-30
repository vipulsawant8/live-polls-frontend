import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSocket, initSocket } from "./socket.js";

import { registerPollReceivers, unregisteredPollReceivers } from "./receivers.js";

const SocketProvider = () => {

	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	
	const dispatch = useDispatch();

	useEffect(() => {

		if (!isAuthenticated) return;

		initSocket();

		const socket = getSocket();

		registerPollReceivers(socket, dispatch);

		return () => {
			
			unregisteredPollReceivers(socket);
		};
	}, [isAuthenticated]);
	return null;
}

export default SocketProvider;