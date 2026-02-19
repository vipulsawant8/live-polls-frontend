import axios from "axios";
import { triggerLogout } from "@/app/logoutHandler.js";

import notify from "@/utils/notify.js";
import { getDeviceId } from "@/utils/deviceId.js";

const deviceId = getDeviceId();

const API = axios.create({
	
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	}
});

API.interceptors.request.use((config) => {

	if (import.meta.env.DEV) {
		
		console.info("API Request :", {
			url: config.url,
			method: config.method,
			data: config.data,
			params: config.params
		});

	}
	return config;

}, (error) => {
	return Promise.reject(error);
});

API.interceptors.response.use(res => {
	
	if (import.meta.env.DEV) {
		
		console.info("API Response :", {
			url: res.config.url,
			status: res.status,
		});

	}
	return res;

}, async (error) => {
	
	const original = error.config;
	
	if (import.meta.env.DEV) {
		
		console.error("API Error :", {
			url: original?.url,
			method: original?.method,
			status: error.response?.status,	
			data: error.response?.data,
		});
	}

	if (error.code === "ERR_NETWORK") {

		notify.warn("Back-end is down", { position: "top-center", autoClose: 2000, hideProgressBar: true });
	}
	
	const skipRefreshUrls = ['/auth/send-otp', '/auth/verify-otp', '/auth/register', '/auth/login', '/auth/refresh-token', '/auth/logout'];

	const isSkipRefresh = skipRefreshUrls.some(url => original.url.includes(url));
	
	if (isSkipRefresh) {

		return Promise.reject(error);
	}

	if (error.response?.status === 401 && !original.retry) {
		
		original.retry = true;

		try {
			
			await API.post('/auth/refresh-token', { deviceId });

			return API(original);
		} catch (refreshError) {
	
			triggerLogout();
			if (import.meta.env.DEV) {
				console.error("Token refresh failed. Redirecting to login.", refreshError);
			}
			return Promise.reject(refreshError);
		}
	}

	return Promise.reject(error);
});

export default API;