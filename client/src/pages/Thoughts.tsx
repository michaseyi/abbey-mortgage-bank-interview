import { useMutation, useQuery, useQueryClient } from "react-query"
import thoughtApi from "../api/thought"
import { Loader } from "../components/Loader"
import { useEffect } from "react"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

const Thoughts = () => {
	const queryClient = useQueryClient()
	const { data, error, isLoading } = useQuery("myThoughts", () => thoughtApi.fetchThoughts(0, 10))

	const deleteThought = useMutation((thoughtId: string) => thoughtApi.deleteThought(thoughtId), {
		onSuccess: () => {
			queryClient.invalidateQueries("myThoughts")
			toast.success("Thought deleted successfully")
		},
		onError: (error) => {
			if (!isAxiosError(error)) {
				return
			}
			console.log(error)
			toast.error(error.response?.data.message)
		},
	})

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
				<div className="text-2xl font-bold mb-4">Thoughts from you</div>
				{data && data.data.thoughts.length > 0 && (
					<div className="space-y-6">
						{data.data.thoughts.map((thought) => (
							<div
								onClick={async () => {
									await deleteThought.mutateAsync(thought.id)
								}}
								key={thought.id}
								className="border border-secondary_/30 p-4 rounded-xl"
							>
								<p className="text-sm">{thought.content}</p>
								<p className="text-xs  text-right">Posted by {thought.user.email}</p>
							</div>
						))}
					</div>
				)}

				{data && data.data.thoughts.length === 0 && (
					<p className="text-center border border-secondary_/30 rounded-md py-8 px-3">
						Nothing to see here
					</p>
				)}
			</div>
		</div>
	)
}

export default Thoughts
