import { useEffect } from "react"
import store from "../store"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export const ProtectedRoute = () => {
	const user = store.use.user()

	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate(`/sign-in?${new URLSearchParams({ next: location.pathname }).toString()}`)
		}
	}, [location.pathname])

	return user ? <Outlet /> : <div>Redirecting...</div>
}
