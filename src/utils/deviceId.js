export const getDeviceId = () => {
	let deviceId = localStorage.getItem("deviceId");
	if (!deviceId) {
		deviceId = window.crypto.randomUUID();
		localStorage.setItem("deviceId", deviceId);
	}
	if (import.meta.env.DEV) console.log("Device ID :", deviceId);
	return deviceId;
};