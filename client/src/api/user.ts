import { AxiosResponse } from "axios"
import { User } from "../store"
import axiosInstance from "./axios"

type Following = {
	id: string
	following: User
}

type Follower = {
	id: string
	follower: User
}

type GetFollowingResponse = {
	followings: Following[]
}

type GetFollowerResponse = {
	followers: Follower[]
}

export type SearchUserResponse = {
	result: (User & { isFollowing: boolean })[]
}

type UserApi = {
	updateUsername: (username: string) => Promise<AxiosResponse<any>>
	updateUserProfile: (profile: Partial<User>) => Promise<AxiosResponse<any>>

	getFollowers: () => Promise<AxiosResponse<GetFollowerResponse>>
	getFollowing: () => Promise<AxiosResponse<GetFollowingResponse>>
	searchUsers: (query: string) => Promise<AxiosResponse<SearchUserResponse>>

	follow: (userId: string) => Promise<AxiosResponse<any>>
	unfollow: (userId: string) => Promise<AxiosResponse<any>>
}

const userApi: UserApi = {
	updateUsername: (username: string) => axiosInstance.patch("/user/update-username", { username }),
	updateUserProfile: (profile: Partial<User>) => axiosInstance.patch("/user/", profile),

	getFollowers: () => axiosInstance.get("/user/followers"),
	getFollowing: () => axiosInstance.get("/user/followings"),

	searchUsers: (query: string) => axiosInstance.get(`/user/search?q=${query}`),

	follow: (userId: string) => axiosInstance.get(`/user/follow/${userId}`),
	unfollow: (userId: string) => axiosInstance.get(`/user/unfollow/${userId}`),
}

export default userApi
