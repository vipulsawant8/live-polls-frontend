import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import asyncThunkWrapper from "@/utils/asyncThunkWrapper.js";
import API from "@/api/axios.js";

export const getMe = createAsyncThunk('auth/getMe', (_, thunkAPI) => asyncThunkWrapper(() => API.get('/auth/me'), thunkAPI));

export const registerUser = createAsyncThunk('auth/registerUser', (userData, thunkAPI) => asyncThunkWrapper(() => API.post('/auth/register', userData), thunkAPI));

export const loginUser = createAsyncThunk('auth/loginUser', (userData, thunkAPI) => asyncThunkWrapper(() => API.post('/auth/login', userData), thunkAPI));

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	try {
		await API.post('/auth/logout');	
	} catch (error) {
		
		console.warn("Logout API error :", error);
	}
	return;
});

const authSlice = createSlice({

	name: "auth",
	initialState: {

		user: null,
		loading: false,
		error: null,
		isAuthenticated: false,
	},
	reducers: {

	},
	extraReducers: builder => {

		builder
		.addCase(getMe.pending, (state) => {

			state.loading = false;
			state.error = null;
		})
		.addCase(getMe.fulfilled, (state, action) => {

			state.loading = false;
			const user = action.payload.data;
			state.isAuthenticated = true;
			state.user = user;
			state.error = null;
		})
		.addCase(getMe.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(registerUser.pending, (state) => {
			
			state.loading = true;
			state.error = null;
		})
		.addCase(registerUser.fulfilled, (state, action) => {
			
			state.loading = false;
			state.error = null;
		})
		.addCase(registerUser.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(loginUser.pending, (state) => {

			state.loading = true;
			state.error = null;
		})
		.addCase(loginUser.fulfilled, (state, action) => {

			state.loading = false;

			const user = action.payload.data;
			state.isAuthenticated = true;
			state.user = user;
			state.error = null;
		})
		.addCase(loginUser.rejected, (state, action) => {

			state.loading = false;
			state.error = action.payload.message;
		})
		.addCase(logoutUser.pending, (state) => {

			state.error = null;
		})
		.addCase(logoutUser.fulfilled, (state, action) => {

			state.user = null;
			state.error = null;
			state.isAuthenticated = false;
		})
		.addCase(logoutUser.rejected, (state, action) => {

			state.user = null;
			state.error = null;
			state.isAuthenticated = false;
		})
	}
});

export default authSlice.reducer;