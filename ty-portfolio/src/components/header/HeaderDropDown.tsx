import React, { } from "react";
import { projects } from "../projects-components/ProjectList";

export function HeaderDropdown({ handleProjectClick }) {

	return (
		<div>
			<ul tabIndex={0} className="dropdown-content menu bg-violet-800/95 rounded-b-xl z-[1] w-60 h-auto p-5 shadow gap-3 text-lg ">
				{projects.map((project, index) => (
					<a href="#" key={index} className="hover:text-violet-300" onClick={() => handleProjectClick(project)}>
						{project.tabtitle}
					</a>
				))}
			</ul>
		</div>
	);
}