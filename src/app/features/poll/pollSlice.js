import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import asyncThunkWraper from "@/utils/asyncThunkWrapper.js";
import API from "@/api/axios.js";

const pollAdapter = createEntityAdapter({
	selectId: poll => poll._id,
	sortComparer: (a,b) => {
		if (a.open !== b.open) {
			
			return a.open ? -1:1;
		}
		return new Date(b.updatedAt) - new Date(a.updatedAt)}
});

const fetchPolls = createAsyncThunk('polls/fetchPolls', (_, thunkAPI) => asyncThunkWraper(() => API.get('/polls'), thunkAPI));

const createPoll = createAsyncThunk('polls/createPoll', ({ title, options }, thunkAPI) => asyncThunkWraper(() => API.post('/polls', { title, options }), thunkAPI));

// const getPollByID = createAsyncThunk('polls/getPollByID', (id, thunkAPI) => asyncThunkWraper(() => API.get(`/polls/${id}`), thunkAPI));

const closePoll = createAsyncThunk('polls/closePoll', (id, thunkAPI) => asyncThunkWraper(() => API.post(`/polls/${id}/close`), thunkAPI));

const pollSlice = createSlice({
	name: "polls",
	initialState: pollAdapter.getInitialState({
		loading: false,
		error: null,
		selectedPoll: null,
		message: null,
	}),
	reducers: {

		socketUpdatePoll: (state, action) => {
			const poll = action.payload;
			pollAdapter.upsertOne(state, poll);
		},
		// socketClosePoll: (state, action) => {
		// 	const pollID = action.payload;
		// 	pollAdapter.upsertOne(state, {
		// 		id: pollID,
		// 		open: false
		// 	});
		// },
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		// voteAcceptedMessage: (state, action) => {
		// 	state.message = { type: "success", text: action.payload };
		// },
		// voteRejectedMessage: (state, action) => {
		// 	state.message = { type: "danger", text: action.payload };
		// },
		// clearMessage: (state, action) => {
		// 	state.message = null;
		// },
		selectPoll: (state, action) => {
			state.selectedPoll = action.payload;
		}
	},
	extraReducers: builder => {
		
		builder
		.addCase(fetchPolls.pending, (state) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(fetchPolls.fulfilled, (state, action) => {
			
			pollAdapter.setAll(state, action.payload.data);
			state.loading = false;
		})
		.addCase(fetchPolls.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(createPoll.fulfilled, (state, action) => {

			pollAdapter.addOne(state, action.payload.data);
		})
		// .addCase(getPollByID.fulfilled, (state, action) => {

		// 	state.selectedPoll = action.payload.data;
		// })
		.addCase(closePoll.fulfilled, (state, action) => {

			state.selectedPoll = action.payload.data;
			pollAdapter.upsertOne(state, action.payload.data);
		})
	}
});

export { fetchPolls, createPoll, /* getPollByID, */ closePoll };
export const { socketUpdatePoll, /* voteAcceptedMessage, voteRejectedMessage, */ setMessage, /* clearMessage, */ selectPoll /*, socketClosePoll */ } = pollSlice.actions;
export const { selectAll: selectAllPolls, selectById: selectPollByID, selectIds: selectPollIDs } = pollAdapter.getSelectors(state => state.polls);

export default pollSlice.reducer;