"use client";

import { ScaleLoader } from "react-spinners";

const Loader = () => {
	return (
		<div className="flex flex-col justify-center items-center h-[70vh]">
			<ScaleLoader
				color="#7989d4"
				height={40}
				speedMultiplier={1}
				width={10}
			/>
		</div>
	);
};

export default Loader;

