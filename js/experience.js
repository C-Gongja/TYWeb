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
			navbarElement.innerHTML = data; // Insert the content from projects.html
		})
		.catch((error) => {
			console.error("Error loading experience:", error);
		});
});