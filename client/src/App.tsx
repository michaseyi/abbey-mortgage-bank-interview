import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Header from "./components/Header"
import Search from "./pages/Search"
import Thoughts from "./pages/Thoughts"
import { QueryClient, QueryClientProvider } from "react-query"
import Frens from "./pages/Frens"

const queryClient = new QueryClient()
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<ProtectedRoute />}>
						<Route path="/" element={<Home />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/search" element={<Search />} />
						<Route path="/thoughts" element={<Thoughts />} />
						<Route path="/frens" element={<Frens />} />
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
			<ToastContainer toastStyle={{ backgroundColor: "black" }} />
		</QueryClientProvider>
	)
}

export default App
