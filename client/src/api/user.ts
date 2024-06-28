import { User } from "../store"
import axiosInstance from "./axios"

const userApi = {
	updateUsername: (username: string) => axiosInstance.patch("/user/update-username", { username }),
	updateUserProfile: (profile: Partial<User>) => axiosInstance.patch("/user/", profile),
}

export default userApi
