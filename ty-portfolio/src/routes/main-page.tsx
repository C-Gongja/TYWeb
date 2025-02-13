import React from "react";
import HomePage from "../components/main-components/Homepage";
import Experience from "../components/experience-components/Experiences";
import Projects from "../components/projects-components/Projects";
import ContactForm from "../components/contact/Contact";

const MainPage = () => {
	return (
		<main className="bg-violet-900">
			<HomePage />
			<Experience />
			<Projects />
			<ContactForm />
		</main>
	);
};

export default MainPage;
