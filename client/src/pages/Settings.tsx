import { useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "../components/Loader"
import store from "../store"
import { AxiosError } from "axios"
import userApi from "../api/user"
import authApi from "../api/auth"
import { removeToken } from "../api/axios"
import { useNavigate } from "react-router-dom"

const Settings = () => {
	const [showLoader, setShowLoader] = useState(false)

	const user = store.use.user()!

	const setUser = store.use.setUser()

	const navigate = useNavigate()

	async function handleUserProfileUpdate(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setShowLoader(true)

		const formData = new FormData(event.currentTarget)
		const bio = formData.get("bio") as string
		const firstname = formData.get("firstname") as string
		const lastname = formData.get("lastname") as string

		try {
			await userApi.updateUserProfile({ bio, firstname, lastname })
			toast.success("Profile updated successfully")
			setUser({ ...user, bio, firstname, lastname })
		} catch (error) {
			if (!(error instanceof AxiosError)) {
				return
			}
			toast.error(error.response?.data.message)
		} finally {
			setShowLoader(false)
		}
	}
	async function handleUsernameUpdate(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setShowLoader(true)
		const formData = new FormData(event.currentTarget)
		const username = formData.get("username") as string
		try {
			await userApi.updateUsername(username)
			toast.success("Username updated successfully")
			setUser({ ...user, username })
		} catch (error) {
			if (!(error instanceof AxiosError)) {
				return
			}
			toast.error(error.response?.data.message)
		} finally {
			setShowLoader(false)
		}
	}

	async function handleSignout() {
		try {
			await authApi.logout()
			toast.success("Signed out successfully")
			removeToken()
			localStorage.removeItem("user")
			setUser(null)
			navigate("/sign-in")
		} catch (error) {
			if (!(error instanceof AxiosError)) {
				return
			}
			toast.error(error.response?.data.message)
		}
	}

	return (
		<div className="min-h-screen flex flex-col items-center bg-primary_/95 p-4 text-secondary_/80">
			{showLoader && <Loader />}
			<div className="max-w-2xl w-full space-y-8 border-secondary_/30 border p-8 rounded-xl shadow-lg">
				<h2 className="text-center text-2xl font-extrabold">Edit your profile</h2>

				<h3 className="text-lg font-semibold text-center">{user.email}</h3>
				<form className="space-y-4" onSubmit={handleUserProfileUpdate}>
					<div>
						<label htmlFor="bio" className="block text-sm font-medium text-secondary_/80">
							Bio
						</label>
						<textarea
							name="bio"
							id="bio"
							defaultValue={user.bio}
							rows={3}
							className="mt-1 block w-full px-3 py-2 border bg-transparent border-secondary_/30 rounded-md shadow-sm focus:outline-none sm:text-sm"
							placeholder="Tell us a bit about yourself..."
						/>
					</div>
					<div className="flex space-x-4">
						<div className="flex-1">
							<label htmlFor="first-name" className="block text-sm font-medium text-secondary_/80">
								First Name
							</label>
							<input
								defaultValue={user.firstname}
								id="first-name"
								name="firstname"
								type="text"
								placeholder="First Name"
								className="mt-1 block w-full px-3 py-2 border bg-transparent border-secondary_/30 rounded-md shadow-sm focus:outline-none sm:text-sm"
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="last-name" className="block text-sm font-medium text-secondary_/80">
								Last Name
							</label>
							<input
								defaultValue={user.lastname}
								id="last-name"
								name="lastname"
								type="text"
								placeholder="Last Name"
								className="mt-1 block w-full px-3 py-2 border border-secondary_/30 bg-transparent rounded-md shadow-sm focus:outline-none sm:text-sm"
							/>
						</div>
					</div>

					<button className="w-full flex justify-center py-2 px-4 border border-secondary_/30 font-medium text-sm rounded-md  focus:outline-none">
						Update Profile
					</button>
				</form>

				{/* Username */}
				<form className="space-y-4" onSubmit={handleUsernameUpdate}>
					<div>
						<label htmlFor="username" className="block text-sm font-medium">
							Username
						</label>
						<input
							defaultValue={user.username}
							name="username"
							id="username"
							type="text"
							className="mt-1 block w-full px-3 py-2 bg-transparent border border-secondary_/30 rounded-md shadow-sm focus:outline-none sm:text-sm"
							placeholder="Enter your username"
						/>
					</div>

					<button className="w-full flex justify-center py-2 px-4 border border-secondary_/30 font-medium text-sm rounded-md  focus:outline-none">
						Update Username
					</button>
				</form>
				<button
					onClick={handleSignout}
					className="w-full flex justify-center py-2 px-4 border border-secondary_/30 font-medium text-sm rounded-md  focus:outline-none"
				>
					Sign out
				</button>
			</div>
		</div>
	)
}

export default Settings
