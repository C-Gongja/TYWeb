import React from "react";

interface Experience {
	companyImg: string;
	jobTitle: string;
	company: string;
	jobType: string;
	duration: string;
	description: string[];
}

interface ExperienceProps {
	Experience: Experience;
}

export default function TimelineItem({ Experience }: ExperienceProps) {

	return (
		<>
			<img
				src={Experience.companyImg}
				width={120}
				height={"auto"}
				alt="logo"
				className="select-none rounded-xl"
			/>
			<h1 className="lg:text-[60px] text-white">{Experience.jobTitle}</h1>
			<h1 className="lg:text-[40px] text-white"> {Experience.company} | {Experience.jobType}</h1>
			<h1 className="lg:text-[25px] text-gray">{Experience.duration}</h1>
			<div className="mt-2">
				{Experience.description.map((item, index) => {
					return (
						<div key={index}>
							<li className="text-white break-words text-xl mb-3">{item}</li>
						</div>
					);
				})}
			</div>
		</>
	);
}
