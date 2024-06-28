import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import authApi, { StartEmailSignInFlowResponse, VerifyEmailSignInFlowResponse } from "../api/auth"

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "../components/ui/input-otp"

import { AxiosError } from "axios"
import { setToken } from "../api/axios"
import { Loader } from "../components/Loader"
import { toast } from "react-toastify"
import store, { User } from "../store"

const SignIn = () => {
	const navigate = useNavigate()

	const location = useLocation()

	const setUser = store.use.setUser()

	const authFlowId = new URLSearchParams(location.search).get("auth_flow_id")

	const next = new URLSearchParams(location.search).get("next")

	const user = store.use.user()

	const [showLoader, setShowLoader] = useState(false)

	useEffect(() => {
		if (user) {
			navigate(next ?? "/")
		}
	}, [user])

	async function handleEmailEntryStageComplete(email: string) {
		setShowLoader(true)

		try {
			const { data: data_ } = await authApi.startEmailSignInFlow(email)
			const data = data_ as StartEmailSignInFlowResponse
			const search = new URLSearchParams(location.search)
			search.set("auth_flow_id", data.flowId)
			navigate(`${location.pathname}?${search.toString()}`)
		} catch (error) {
			if (!(error instanceof AxiosError)) {
				return
			}
			toast.error(error.response?.data.message)
		} finally {
			setShowLoader(false)
		}
	}

	async function handleTokenEntryStageComplete(token: string) {
		setShowLoader(true)
		try {
			const { data: data_ } = await authApi.verifyEmailSignInFlow(authFlowId!, token)
			const data = data_ as VerifyEmailSignInFlowResponse
			setToken(data.sessionToken)
		} catch (error) {
			if (!(error instanceof AxiosError)) {
				return
			}
			toast.error(error.response?.data.message)
		} finally {
			setShowLoader(false)
		}

		try {
			const { data: data_ } = await authApi.me()
			const data = data_ as User
			setUser(data)
			navigate(next ?? "/")
		} catch (error) {}
	}
	return (
		<>
			{showLoader && <Loader />}
			<div className="min-h-dvh flex  justify-center bg-primary_/95 p-4 text-secondary_/80 ">
				<div className="max-w-2xl  w-full space-y-8 border-secondary_/30 border p-8 rounded-xl self-start">
					{authFlowId ? (
						<TokenEntryStage onStageComplete={handleTokenEntryStageComplete} />
					) : (
						<EmailEntryStage onStageComplete={handleEmailEntryStageComplete} />
					)}
				</div>
			</div>
		</>
	)
}

type EmailEntryStageProps = {
	onStageComplete: (email: string) => void
}
const EmailEntryStage: React.FC<EmailEntryStageProps> = ({ onStageComplete }) => {
	const [email, setEmail] = useState("")

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onStageComplete(email)
	}

	return (
		<>
			<div>
				<h2 className="mt-6 text-center text-2xl font-extrabold">Sign in to your account</h2>
				<p className="mt-2 text-center text-sm">
					Enter your email to initiate the authentication process
				</p>
			</div>
			<form className="pt-14 space-y-6" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email-address" className="sr-only">
						Email address
					</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autoComplete="email"
						required
						className="rounded-md bg-transparent border-secondary_/30 border shadow-sm w-full px-3 py-2  placeholder-gray-400 focus:outline-none text-sm"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-secondary_/30  font-medium text-sm rounded-md  focus:outline-none"
					>
						Sign In
					</button>
				</div>
			</form>
		</>
	)
}

type TokenEntryStageProps = {
	onStageComplete: (token: string) => void
}
const TokenEntryStage: React.FC<TokenEntryStageProps> = ({ onStageComplete }) => {
	return (
		<div className="space-y-2 text-secondary_/70 flex flex-col justify-center items-center">
			<h2 className="text-xl font-semibold">Enter Your Sign-In Token</h2>
			<p className="pb-8 text-center">
				We've sent a 6-digit token to your email. Please enter it below to complete your sign-in.
			</p>
			<InputOTP
				maxLength={6}
				onChange={(value) => {
					if (value.length === 6) {
						onStageComplete(value)
					}
				}}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	)
}

export default SignIn
