import { AxiosResponse } from "axios"
import axiosInstance from "./axios"
import { User } from "../store"

type Thought = {
	id: string
	content: string
	user: User
	createdAt: string
}

type ThoughtApi = {
	createThought: (content: string) => Promise<AxiosResponse<Thought, any>>
	deleteThought: (id: string) => Promise<AxiosResponse<any, any>>
	fetchThoughts: (
		start: number,
		limit: number,
		id?: string
	) => Promise<AxiosResponse<{ thoughts: Thought[] }, any>>

	fetchFeed: (start: number, limit: number) => Promise<AxiosResponse<{ thoughts: Thought[] }, any>>
}
const thoughtApi: ThoughtApi = {
	createThought: (content: string) => axiosInstance.post("/user/thoughts", { content }),
	deleteThought: (id: string) => axiosInstance.delete(`/user/thoughts/${id}`),

	fetchThoughts: (start: number, limit: number, id?: string) => {
		const params = new URLSearchParams()
		params.append("start", start.toString())
		params.append("limit", limit.toString())

		if (id) {
			params.append("userId", id)
		}
		return axiosInstance.get(`/user/thoughts?${params.toString()}`)
	},

	fetchFeed: (start: number, limit: number) => {
		const params = new URLSearchParams()
		params.append("start", start.toString())
		params.append("limit", limit.toString())

		return axiosInstance.get(`/user/thoughts/feed?${params.toString()}`)
	},
}

export default thoughtApi
