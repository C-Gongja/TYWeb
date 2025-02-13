import React from "react";
import LogoThree from "./Logo3D";

const HomePage = () => {
	const url = "/assest/images/logo/3d_logo.stl";
	return (
		<div id="home" className="pt-[150px] pb-[80px] px-[40px] bg-transparent">
			<div className="grid grid-rows-2 items-center max-w-full h-[70vh] p-0
			md:mb-[50px]
			xl:grid-cols-[1.3fr_1fr] xl:grid-rows-none">
				<div className=" mt-[5rem] flex flex-col order-1
				md:ml-[50px] 
				lg:ml-[200px] lg:mb-[150px]">
					<h1 className="text-5xl font-bold text-violet-400
					md:text-8xl 
					lg:text-5xl lg:!text-[120px] "
					>
						Taeyoon Kim
					</h1>
					<h2 className="ml-1 mt-5 text-3xl font-semibold text-cyan-400 
					md:text-5xl
					lg:text-[70px] lg:ml-4"
					>
						a Software Engineer
					</h2>
					<p className="ml-2 mt-4 text-xl text-gray-300 break-words
					md:text-lg
					lg:ml-5 lg:text-xl lg:text-[32px] lg:mt-[30px]">
						I love to solve complex problems and make them into real products. <br />
						Also, I love to learn new things and implement them into real projects.
					</p>
				</div>
				{/* <div className="absolute right-[150px] h-[200px] w-[500px] bg-cyan-400 transform skew-y-12 opacity-70" /> */}

				<div className="xl:order-2 flex justify-center items-center">
					<LogoThree url={url} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
