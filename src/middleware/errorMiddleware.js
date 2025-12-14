const errorMiddleware = (store) => (next) => (action) => {
	try {
		
		return next(action);
	} catch (error) {
		
		console.error("Error occurred during action processing:", {
			action: action.type,
			message: error.message,
			stack: error.stack
		});

		throw error;
	}
};

export default errorMiddleware;