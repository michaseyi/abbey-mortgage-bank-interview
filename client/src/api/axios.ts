import axios from "axios"

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
})

const token = localStorage.getItem("token")
if (token) {
	axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
}

export function setToken(token: string) {
	localStorage.setItem("token", token)
	axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`
}

export function removeToken() {
	localStorage.removeItem("token")
	delete axiosInstance.defaults.headers["Authorization"]
}

export default axiosInstance
