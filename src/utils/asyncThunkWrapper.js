const asyncThunkWraper = async (apiCall, thunkAPI) => {

	try {
		
		const res = await apiCall();
		return res.data;
	} catch (error) {
		
		return thunkAPI.rejectWithValue(error.response?.data?.message  || error.message || 'Something failed');
	}
};

export default asyncThunkWraper;