import React, { useEffect } from "react";

function ModalTitle({ project, onClose }) {
	return (
		<div className="">
			<div className="px-[20px] flex flex-row gap-5 items-center">
				<img
					src={project.image}
					alt={project.title}
					className="w-[60px] h-[60px] rounded-full shadow-lg"
				/>
				<h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-black">{project.modaltitle}</h2>
				<a href={project.githublink} target="_blank" className="hidden md:block">
					<img
						src="/assest/images/github-mark/github-mark.svg"
						alt="Button Image"
						className="max-w-[40px] max-h-[40px] p-[2px] md:max-w-[50px] md:max-h-[50px] md:object-contain transition transform hover:scale-105 rounded-full"
					/>
				</a>
			</div>
			<button
				className=" absolute top-2 right-3 text-black text-2xl cursor-pointer"
				onClick={onClose}
			>
				✕
			</button>
		</div>
	);
}

function ModalBody({ project }) {
	return (
		<div className="p-2 md:p-6 text-black max-w-full mx-auto">
			{/* Intro */}
			{project.description.Intro && (
				<p className="text-lg text-black mb-6">{project.description.Intro}</p>
			)}

			{/* 상세 설명 */}
			{project.description.body.map((section, index) => (
				<div key={index} className="mb-6">
					{/* 섹션 제목 */}
					<h2 className="text-2xl font-semibold mb-3">{section.title}</h2>

					<ul className="list-disc list-inside space-y-3 text-black">
						{section.bullets.map((bullet, idx) => (
							<li key={idx} className="ml-4">
								{/* `subtitle`이 있는 경우 */}
								{typeof bullet === "object" ? (
									<>
										<span className="font-semibold text-lg"> {bullet.subtitle}</span>
										<ul className="list-circle list-inside ml-6 text-black">
											{bullet.subBullets.map((subBullet, subIdx) => (
												<li key={subIdx}>{subBullet}</li>
											))}
										</ul>
									</>
								) : (
									bullet
								)}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

function Tags({ project }) {
	return (
		<div className="flex flex-wrap justify-center gap-2 m-4">
			{project.technologies.map((tech) => (
				<span key={tech} className="px-3 py-1 text-sm bg-black text-white rounded-lg shadow-lg">
					{tech}
				</span>
			))}
		</div>
	);
}

function Demo({ project }) {
	return (
		< >
			{project.attach && project.attach.length > 0 && (
				project.attach.map((item, index) => (
					<div key={index}>
						<h2 id="" className="text-black text-xl">{item.title}</h2>
						<img src={item.src} alt="" />
					</div>
				))
			)}

			<div>
				<h1 className="text-black text-xl">Demo</h1>
				<video className="rounded-xl cursor-pointer" controls>
					<source src={project.demo} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		</>
	);
}

function ProjectModal({ project, onClose }) {
	if (!project) return null;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		// 모달이 열렸을 때 body 스크롤 비활성화
		document.body.style.overflow = "hidden";

		// 모달이 닫힐 때 원상복구
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg z-50"
			onClick={onClose}
		>
			<div
				className="relative w-[90%] max-h-[70%] md:max-w-[65%] p-6 rounded-2xl bg-white backdrop-blur-xl shadow-xl
        transition-discrete starting-style:open:opacity-0
				grid grid-cols-1 grid-rows-[0.1fr_1fr_1fr] 
				lg:grid-cols-2 lg:grid-rows-[0.1fr_1fr] gap-2"
				onClick={(e) => e.stopPropagation()} // 모달 내부 클릭시 닫히지 않도록
			// style={{ maxHeight: "85vh", maxWidth: "90vw" }} // 모달 최대 높이 제한
			>
				<div className="col-span-2">
					<ModalTitle project={project} onClose={onClose} />
				</div>
				<div className="pr-4 max-h-[68vh] overflow-y-auto no-scrollbar row-start-3 lg:row-start-2 mt-5 scrollbar-hidden">
					<ModalBody project={project} />
				</div>
				<div className="flex flex-col pr-4 max-h-[68vh]  overflow-y-auto no-scrollbar row-start-2 mt-5 scrollbar-hidden">
					<Tags project={project} />
					<Demo project={project} />
				</div>
			</div>
		</div >
	);
}

export default ProjectModal;
