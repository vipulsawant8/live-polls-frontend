import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSocket, initSocket } from "./socket.js";

import { registerPollReceivers, unregisteredPollReceivers } from "./receivers.js";

const SocketProvider = () => {

	const user = useSelector(state => state.auth.user);
	
	const dispatch = useDispatch();

	useEffect(() => {

		if (!user) return;

		initSocket();

		const socket = getSocket();

		registerPollReceivers(socket, dispatch);

		return () => {
			
			unregisteredPollReceivers(socket);
		};
	}, [user]);
	return null;
}

export default SocketProvider;