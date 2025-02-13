import { useState, useRef } from "react";
import ProjectModal from "./modal-components/Modals";
import { projects, Project } from "./ProjectList"; // Assuming Project type is defined in ProjectList
import AnimationWrapper from "../animation/AnimationWrapper";

interface ProjectsProps { }

const tabs = ["all", "ai", "web", "software"];

const Projects: React.FC<ProjectsProps> = () => {
	const [activeTab, setActiveTab] = useState<string>("all");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Filter projects based on the active tab
	const filteredProjects: Project[] =
		activeTab === "all"
			? projects
			: projects.filter((project) => project.category === activeTab);

	// Get scroll amount based on screen size
	const getScrollAmount = (): number => {
		if (window.innerWidth > 1200) return 1000;  // Desktop
		if (window.innerWidth > 768) return 600;   // Tablet
		return 385;  // Mobile
	};

	// Scroll left function
	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: -getScrollAmount(),
				behavior: "smooth",
			});
		}
	};

	// Scroll right function
	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: getScrollAmount(),
				behavior: "smooth",
			});
		}
	};

	return (
		<div id="projects" className="px-5 bg-transparent md:px-30">
			<div className="h-[120px]" />

			{/* Title Section */}
			<AnimationWrapper animationType={"scale"} delay="0.3s">
				<div className="ml-[20px] font-bold text-6xl text-white md:text-7xl md:text-center md:ml-0">
					<h1>Projects</h1>
				</div>
			</AnimationWrapper>

			{/* Tabs Section */}
			<AnimationWrapper animationType={"scale"} delay="1s">
				<div className="flex justify-center space-x-2 md:space-x-4 mt-[50px] mb-10">
					{tabs.map((tab) => (
						<TabButton
							key={tab}
							tab={tab}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					))}
				</div>
			</AnimationWrapper>

			{/* Projects Container */}
			<AnimationWrapper animationType={"translateXFromRight"} delay="0.3s">
				<div
					ref={containerRef}
					className="flex gap-6 overflow-x-auto scrollbar-hide p-4 h-150 mx-auto md:max-w-[80%]"
				>
					{filteredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
					))}
				</div>
			</AnimationWrapper>

			<div className="relative">
				<ScrollButton direction="left" onClick={scrollLeft} />
				<ScrollButton direction="right" onClick={scrollRight} />
			</div>

			{/* Modal */}
			{selectedProject && (
				<ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
			)}
		</div>
	);
};

// Tab Button Component
interface TabButtonProps {
	tab: string;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, activeTab, setActiveTab }) => (
	<button
		className={`px-4 py-2 text-lg font-medium rounded-xl transition cursor-pointer ${activeTab === tab
			? "bg-gradient-to-t from-[#7761a9] to-[#7761a97d] backdrop-blur-lg text-white"
			: "bg-gradient-to-t from-[#d9d9d950] to-[#d9d9d91c] backdrop-blur-lg"
			}`}
		onClick={() => setActiveTab(tab)}
	>
		{tab.toUpperCase()}
	</button>
);

// Scroll Button Component
interface ScrollButtonProps {
	direction: "left" | "right";
	onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => (
	<button
		className={`w-[150px] absolute ${direction === "left" ? "left-0" : "right-0"} transform -translate-y-1/2 p-2 cursor-pointer rounded-full z-30 transition-all duration-300
      text-white bg-white/20 shadow-lg ring-1 ring-black/5
      md:w-[70px] md:h-[100px] md:bottom-[200px] md:-${direction === "left" ? "left" : "right"}-[10px]
      lg:w-[70px] lg:h-[100px] lg:${direction === "left" ? "left-10" : "right-10"} lg:bottom-[200px] lg:text-violet-300 
      active:bg-violet-400 lg:hover:bg-violet-400 lg:hover:text-white`}
		onClick={onClick}
	>
		{direction === "left" ? "<" : ">"}
	</button>
);

// Project Card Component
interface ProjectCardProps {
	project: Project;
	onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
	<div className="relative group cursor-pointer" onClick={onClick}>
		<div className="absolute -inset-1 bg-gradient-to-r from-[#d9d9d91c] to-[#d9d9d950]rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
		<div className="flex flex-col w-80 min-w-[360px] h-[96%] bg-gradient-to-t from-[#d9d9d91c] to-[#d9d9d950] backdrop-blur-lg rounded-3xl overflow-hidden cursor-pointer transition transform hover:scale-105 hover:z-10">
			<div className="min-h-85 p-5 relative overflow-hidden">
				<img
					src={project.image}
					alt="Project"
					className="w-full h-[300px] object-contain bg-white rounded-2xl p-5"
				/>
			</div>
			<div className="p-4">
				<h2 className="text-3xl font-bold text-gray-200 min-h-20 flex justify-center items-center text-center" dangerouslySetInnerHTML={{ __html: project.title }} />
				<div className="min-h-20">
					<div className="flex flex-wrap gap-2 mt-2 justify-center">
						{project.technologies.map((tech) => (
							<span
								key={tech}
								className="px-3 py-0.5 text-xg text-white bg-violet-500 font-regular rounded-lg"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Projects;
