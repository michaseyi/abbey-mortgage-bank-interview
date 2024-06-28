import React, { useState } from "react"

const Search: React.FC = () => {
	const [query, setQuery] = useState<string>("")
	const [results, setResults] = useState<any[]>([])

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<div className="min-h-screen flex flex-col items-center bg-primary_/95 p-4 text-secondary_/80">
			<div className="space-y-8 max-w-2xl w-full">
				<form onSubmit={handleSearch} className="space-y-6">
					<input
						type="text"
						placeholder="Find frens..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full px-3 py-2 rounded-md bg-transparent border-secondary_/30 border shadow-sm text-sm placeholder-gray-400 focus:outline-none"
					/>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-secondary_/30 font-medium text-sm rounded-md focus:outline-none"
					>
						Find
					</button>
				</form>
				<div className="space-y-6">
					{results.length > 0 ? (
						results.map((result, index) => (
							<div key={index} className="border border-secondary_/30 p-4 rounded-xl">
								<p className="text-sm">{result.name}</p>
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
