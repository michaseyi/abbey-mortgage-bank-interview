import axiosInstance from "./axios"

export type StartEmailSignInFlowResponse = {
	flowId: string
}

export type VerifyEmailSignInFlowResponse = {
	sessionToken: string
}

const authApi = {
	startEmailSignInFlow: (email: string) =>
		axiosInstance.post("/auth/start-email-signin-flow", { email }),
	verifyEmailSignInFlow: (authFlowId: string, token: string) =>
		axiosInstance.post(`/auth/verify-email-signin-flow/`, {
			token,
			flowId: authFlowId,
		}),

	me: () => axiosInstance.get("/auth/me"),

	logout: () => axiosInstance.get("/auth/signout"),
}

export default authApi
