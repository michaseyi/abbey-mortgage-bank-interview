import { Link } from "react-router-dom"
import store from "../store"

const Header = () => {
	const user = store.use.user()

	return (
		<header className="w-full sticky top-0 bg-primary_ text-secondary_/80 shadow-sm py-4">
			<div className="container mx-auto flex justify-between items-center px-4">
				<div>
					{user && (
						<Link to="/" className="text-sm border border-secondary_/30 py-1 px-2 rounded-md">
							Home
						</Link>
					)}
				</div>
				<nav className="flex items-center space-x-3">
					{user ? (
						<>
							<Link
								to="/thoughts"
								className="text-sm border border-secondary_/30 py-1 px-2 rounded-md"
							>
								Thoughts
							</Link>
							<Link
								to="/frens"
								className="text-sm border border-secondary_/30 py-1 px-2 rounded-md"
							>
								Frens
							</Link>
							<Link
								to="/settings"
								className="text-sm border border-secondary_/30 py-1 px-2 rounded-md"
							>
								Settings
							</Link>
							<Link
								to="/search"
								className="text-sm border border-secondary_/30 py-1 px-2 rounded-md"
							>
								Search
							</Link>
						</>
					) : (
						<Link
							to="/sign-in"
							className="text-sm border border-secondary_/30 py-1 px-2 rounded-md"
						>
							Sign In
						</Link>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Header
