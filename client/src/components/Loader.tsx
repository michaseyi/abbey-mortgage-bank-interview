import PulseLoader from "react-spinners/PulseLoader"

export function Loader() {
	return (
		<div className="fixed top-0 left-0 w-screen h-dvh backdrop-blur-sm z-[100] flex items-center justify-center ">
			<PulseLoader
				color={"white"}
				loading={true}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	)
}
