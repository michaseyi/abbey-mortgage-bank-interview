import { useQuery } from "react-query"
import { Loader } from "../components/Loader"
import { useEffect } from "react"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"
import userApi from "../api/user"

const Frens = () => {
	const { data, error, isLoading } = useQuery("following", () => userApi.getFollowing())

	useEffect(() => {
		if (error) {
			if (!isAxiosError(error)) {
				return
			}
			toast.error(error.response?.data.message)
		}
	}, [error])

	return (
		<div className="min-h-screen flex flex-col items-center bg-primary_/95 p-4 text-secondary_/80">
			{isLoading && <Loader />}
			<div className="max-w-2xl w-full">
				<div className="text-2xl font-bold mb-4">Thought posters you follow</div>
				{data && data.data.followings.length > 0 && (
					<div className="space-y-6">
						{data.data.followings.map((following) => (
							<div
								onClick={async () => {}}
								key={following.following.id}
								className="border border-secondary_/30 p-4 rounded-xl"
							>
								<p className="text-sm">{following.following.email}</p>
							</div>
						))}
					</div>
				)}

				{data && data.data.followings.length === 0 && (
					<p className="text-center border border-secondary_/30 rounded-md py-8 px-3">
						Nothing to see here
					</p>
				)}
			</div>
		</div>
	)
}

export default Frens
