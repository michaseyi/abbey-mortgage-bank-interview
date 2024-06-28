// src/components/Home.js
import React, { useState, useEffect } from "react"
// import postApi from "../api/postApi"
import { toast } from "react-toastify"
import { Loader } from "../components/Loader"
import store from "../store"
import { AxiosError, isAxiosError } from "axios"
import thoughtApi from "../api/thought"
import { useQuery } from "react-query"

const Home = () => {
	const [posts, setPosts] = useState([
		{
			id: 1,
			content:
				"Quod amet, omnis architecto doloribus corporis corrupti sequi inventore maxime voluptatum, at nihil fugit quasi iusto quos quis commodi tenetur cumque enim incidunt! Necessitatibus sequi dolor magnam aperiam? Doloribus, iusto.",
			user: {
				id: 1,
				name: "John Doe",
			},
		},
		{
			id: 2,
			content:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea corporis voluptates fugiat unde necessitatibus perferendis quas perspiciatis error odio dolor.",
			user: {
				id: 1,
				name: "John Doe",
			},
		},
	])

	const { data, error, isLoading } = useQuery("feed", () => thoughtApi.fetchFeed(0, 10))

	useEffect(() => {
		if (error) {
			toast.error("Failed to fetch feed")
		}
	}, [error])

	const [loading, setLoading] = useState(false)

	const user = store.use.user()

	const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const content = formData.get("content") as string

		try {
			setLoading(true)
			const thought = (await thoughtApi.createThought(content)).data
			console.log(thought)
			toast.success("Post created successfully")
		} catch (error) {
			if (!isAxiosError(error)) {
				return
			}
			toast.error(error.response?.data.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex flex-col items-center bg-primary_/95 p-4 text-secondary_/80">
			{(loading || isLoading) && <Loader />}
			<div className="space-y-4 max-w-2xl w-full">
				{user?.firstname && <div className="text-2xl font-bold mb-4">Hello, {user.firstname}</div>}
				<form
					onSubmit={handleCreatePost}
					className="space-y-6 border border-secondary_/30 p-8 rounded-xl"
				>
					<div>
						<label htmlFor="newPost" className="block text-sm mb-1">
							Share a thought
						</label>
						<textarea
							id="newPost"
							name="content"
							className="w-full px-3 py-2 rounded-md bg-transparent border-secondary_/30 border shadow-sm text-sm placeholder-gray-400 focus:outline-none"
							rows={4}
							placeholder="What's on your mind?"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-secondary_/30 font-medium text-sm rounded-md focus:outline-none"
					>
						Share
					</button>
				</form>

				{data && data.data.thoughts.length === 0 && (
					<p className="text-center border border-secondary_/30 rounded-md py-8 px-3">
						Nothing to see here
					</p>
				)}

				{data && (
					<div className="space-y-6">
						{data.data.thoughts.map((thought) => (
							<div key={thought.id} className="border border-secondary_/30 p-4 rounded-xl">
								<p className="text-sm">{thought.content}</p>
								<p className="text-xs text-secondary_/60 text-right">
									Posted by {thought.user.email}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
