document.addEventListener("DOMContentLoaded", () => {
	const navbarElement = document.getElementById("experience");

	fetch("./html/experience.html")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to load experience");
			}
			return response.text();
		})
		.then((data) => {
			navbarElement.innerHTML = data; // Insert the content from experience.html
			initializeTimeline();  // Initialize timeline functionality
		})
		.catch((error) => {
			console.error("Error loading experience:", error);
		});
});

// Initialize the functionality for the career timeline
function initializeTimeline() {
	const timelineItems = document.querySelectorAll('.timeline-item');
	const detailContainer = document.getElementById('detail-container');

	// Add click event to each timeline item
	timelineItems.forEach(item => {
		const position = item.getAttribute('data-position');
		item.style.left = position; // Dynamically set the left position based on the `data-position` value
		item.addEventListener('click', function () {
			const year = this.getAttribute('data-year');
			const job = this.getAttribute('data-job');

			// Display details of the clicked job
			showDetails(year, job);
		});
	});
}

// Show career details in the detail container
function showDetails(year, job) {
	const detailContainer = document.getElementById('detail-container');

	// Example details based on the year
	const details = {
		"2015": "Worked as a freelance graphic designer for a restaurant, creating branding materials.",
		"2018": "Worked as an engineer in EcoCar Davis, contributing to autonomous vehicle projects.",
		"2021": "Developed a 3D customizable character web app as a freelancer using React, TypeScript, and Vite."
	};

	// Set the content of the detail container
	detailContainer.innerHTML = `
		<h3>${year} - ${job}</h3>
		<p>${details[year]}</p>
	`;

	// Show the detail container
	detailContainer.classList.add('active');
}
