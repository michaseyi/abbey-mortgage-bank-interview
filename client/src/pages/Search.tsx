import React, { useEffect, useState } from "react"
import userApi from "../api/user"
import { User } from "../store"
import { Loader } from "../components/Loader"
import { toast } from "react-toastify"

const Search: React.FC = () => {
	const [results, setResults] = useState<(User & { isFollowing: boolean })[]>([])

	const [loader, setLoader] = useState(false)

	const [query, setQuery] = useState("")

	async function invalidateQuery() {
		if (query === "") {
			setResults([])
			return
		} else {
			const { data } = await userApi.searchUsers(query)
			setResults(data.result)
		}
	}

	useEffect(() => {
		invalidateQuery()
	}, [query])

	async function followUser(userId: string) {
		setLoader(true)
		try {
			await userApi.follow(userId)
			invalidateQuery()
		} catch (error) {
			toast.error("Failed to follow user")
		} finally {
			setLoader(false)
		}
	}

	async function unfollowUser(userId: string) {
		setLoader(true)
		try {
			await userApi.unfollow(userId)
			invalidateQuery()
		} catch (error) {
			toast.error("Failed to unfollow user")
		} finally {
			setLoader(false)
		}
	}
	return (
		<div className="min-h-screen flex flex-col items-center bg-primary_/95 p-4 text-secondary_/80">
			{loader && <Loader />}
			<div className="space-y-8 max-w-2xl w-full">
				<search>
					<input
						type="text"
						value={query}
						placeholder="Find frens..."
						onChange={(e) => setQuery(e.target.value)}
						className="w-full px-3 py-2 rounded-md bg-transparent border-secondary_/30 border shadow-sm text-sm placeholder-gray-400 focus:outline-none"
					/>
				</search>
				<div className="space-y-6">
					{results.length > 0 ? (
						results.map((result, index) => (
							<div
								key={index}
								className="border border-secondary_/30 p-4 rounded-xl flex justify-between items-center"
							>
								<p className="text-sm">{result.email}</p>

								<button
									onClick={() => {
										if (result.isFollowing) {
											unfollowUser(result.id)
										} else {
											followUser(result.id)
										}
									}}
									className="text-sm border border-secondary_/30 rounded-md px-2 py-1"
								>
									{result.isFollowing ? "Unfollow" : "Follow"}
								</button>
							</div>
						))
					) : (
						<p className="text-center text-sm">No results found</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Search
