import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TimelineItem from "./TimelineItem";
import { TimelineData } from "./ExperienceList";
import AnimationWrapper from "../animation/AnimationWrapper";
import { useInView } from "framer-motion";

const Experience = () => {
	// const isMobile = window.innerWidth < 1024;
	const isMobile = useMediaQuery({ maxWidth: 1023 });
	const [selectedJob, setSelectedJob] = useState(3);

	useEffect(() => {

	}, [isMobile]);

	const handleClick = (index) => {
		setSelectedJob(selectedJob === index ? null : index);
	};

	return (
		<div id="experience">
			<div className="h-[120px]"></div>
			<div className="px-[40px]
		md:px-[80px]
		lg:px-0 lg:flex lg:flex-col lg:bg-transparent lg:justify-center">
				<AnimationWrapper animationType={"scale"}>
					<h1 className=" font-bold text-white mb-20 text-5xl
			md:text-center md:text-7xl
			lg:font-bold lg:text-7xl lg:flex lg:justify-center lg:text-white"
					>
						Work Experience
					</h1>
				</AnimationWrapper>


				<div className="lg:relative lg:flex lg:flex-col lg:mt-[80px] lg:p-10">
					{/* 수평선 (Horizontal Line) */}
					<AnimationWrapper animationType={"translateXFromLeft"}>
						{isMobile ? null : <HorizontalLine />}
					</AnimationWrapper>

					<div className=" 
				lg:ml-20 lg:w-[70%] lg:relative lg:flex lg:justify-between">
						{isMobile ? (
							[...TimelineData].reverse().map((item, index) => (
								<AnimationWrapper animationType={"scale"} delay="0.3s">
									<MobileTimelineItem
										key={index}
										item={item}
									/>
								</AnimationWrapper>
							))

						) : (
							TimelineData.map((item, index) => (
								<AnimationWrapper animationType={"scale"} delay="1s">
									<BulletPoint
										key={index}
										index={index}
										item={item}
										selectedJob={selectedJob}
										handleClick={handleClick}
									/>
								</AnimationWrapper>
							))
						)
						}
					</div>
				</div>

				{/* Job Details - 전체 화면 크기로 Expand/Collapse */}
				{isMobile ? null : <JobDetails selectedJob={selectedJob} />}
			</div>
		</div>
	);
};

/* ✅ Horizontal Line (수평선) */
const HorizontalLine = () => (
	<div className="lg:relative lg:bg-gray-300 lg:rounded-lg lg:-left-[50px] lg:w-[85%] lg:h-3 lg:top-1/2 lg:flex" />
);

/* ✅ Bullet Point 컴포넌트 */
const BulletPoint = ({ index, item, selectedJob, handleClick }) => {
	const isSelected = index === selectedJob;

	return (
		<div
			className={`lg:relative lg:flex lg:flex-col lg:items-center lg:cursor-pointer lg:transition lg:transform lg:hover:scale-105 lg:hover:z-5
			${isSelected ? "lg:scale-125 lg:hover:scale-125" : ""}`}
			onClick={() => handleClick(index)}
		>
			<h2 className="lg:w-[120px] lg:absolute lg:text-2xl lg:bottom-10 lg:font-semibold lg:text-white lg:text-center lg:whitespace-normal lg:leading-tight">
				{item.jobTitle}
			</h2>
			{/* larger clickalbe area for bullet points */}
			<div className="lg:w-[100px] lg:h-10 lg:absolute lg:-top-6" />
			<div className="lg:w-8 lg:h-8 lg:bg-cyan-400 lg:rounded-full lg:absolute lg:-top-6" />
			<div className={`lg:w-8 lg:h-8 lg:bg-cyan-400 lg:rounded-full lg:absolute lg:-top-6 ${isSelected ? "animate-ping" : ""}`} />
			<p className="lg:absolute lg:top-5 lg:text-2xl lg:text-gray-200 lg:font-semibold">
				{item.year}
			</p>
		</div>
	);
};

const MobileTimelineItem = ({ item }) => {
	return (
		<div className="relative mb-[50px]">
			<div className="flex items-center">
				<div className="flex items-center justify-center w-[70px] h-[70px] rounded-full">
					<img
						src={item.companyImg}
						width={120}
						height={"auto"}
						alt="logo"
						className="select-none rounded-xl"
					/>
				</div>
			</div>
			<div className="mt-1">
				<h1 className="text-[35px] text-white">{item.jobTitle}</h1>
				<h1 className="text-[20px] text-white"> {item.company} | {item.jobType}</h1>
				<h1 className="text-[18px] text-gray">{item.duration}</h1>
				<div className="mt-2">
					{item.description.map((item, index) => {
						return (
							<div key={index}>
								<li className="text-white break-words text-[18px] mb-3">{item}</li>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

/* ✅ Job Details (w-screen에서 Expand/Collapse) */
const JobDetails = ({ selectedJob }) => {
	const contentRef = useRef(null);
	const wrapperRef = useRef(null);
	const [height, setHeight] = useState(0);
	const [hasBeenInView, setHasBeenInView] = useState(false); // 최초 감지 여부

	const isInView = useInView(wrapperRef, { margin: "-50px" });

	// 최초 inView 감지 시 한 번만 실행
	useEffect(() => {
		if (isInView && !hasBeenInView) setHasBeenInView(true);
	}, [isInView, hasBeenInView]);

	useEffect(() => {
		if (contentRef.current && hasBeenInView) {
			// 선택된 Job이 있을 경우 -> Expand
			if (selectedJob !== null) {
				setTimeout(() => {
					setHeight(contentRef.current?.scrollHeight || 0);
				}, 10); // DOM 업데이트 후 반영되도록 setTimeout 추가
			} else {
				// 선택된 Job이 없을 경우 -> Collapse
				setHeight(0);
			}
		}
	}, [selectedJob, hasBeenInView]);

	return (
		<div ref={wrapperRef} className="lg:flex lg:justify-center lg:w-screen lg:mt-[50px] lg:mb-[100px]">
			<div
				className="lg:overflow-hidden lg:transition-all lg:duration-500 lg:ease-in-out lg:w-screen lg:bg-[#321a68] lg:shadow-[inset_0px_0px_45px_-10px_#110826]"
				style={{ height: `${height}px` }}
			>
				<div ref={contentRef} className="lg:px-[250px] lg:py-[50px]">
					{selectedJob !== null && (
						<TimelineItem Experience={TimelineData[selectedJob]} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Experience;
