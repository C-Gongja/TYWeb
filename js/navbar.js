document.addEventListener("DOMContentLoaded", () => {
	const navbarElement = document.getElementById("navbar");
	const basePath = window.location.pathname.includes("TYWeb") ? "/TYWeb" : "";

	fetch(`${basePath}/html/navbar.html`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to load navbar");
			}
			return response.text();
		})
		.then((data) => {
			// Replace navbar content
			navbarElement.innerHTML = data;

			// Update the Home link dynamically
			const navbarLogo = document.querySelector("#navbar__logo a[href='../index.html']");
			if (navbarLogo) {
				navbarLogo.setAttribute("href", `${basePath}/index.html`);
			}

			const homeLink = document.querySelector(".navbar__menu .navbar__links[href='../index.html']");
			if (homeLink) {
				homeLink.setAttribute("href", `${basePath}/index.html`);
			}

			// Update the Resume link dynamically
			const resumeLink = navbarElement.querySelector(".navbar__item a[href='../html/resume.html']");
			if (resumeLink) {
				resumeLink.setAttribute("href", `${basePath}/html/resume.html`);
			}

			// Hide the Contact button on specific pages
			const contactButton = navbarElement.querySelector(".navbar__btn");
			const excludedPages = [`${basePath}/html/resume.html`]; // Add more pages if needed
			if (excludedPages.includes(window.location.pathname)) {
				contactButton.style.display = "none"; // Hide the button
			}

			// loadAssets();

		})
		.catch((error) => {
			console.error("Error loading navbar:", error);
		});
});

// function loadAssets() {
// 	const images = document.querySelectorAll("img[src]");
// 	console.log(window.location.pathname);

// 	images.forEach(img => {
// 		if (!img.src.startsWith(window.location.origin)) {
// 			const imgPath = window.location.pathname.includes("resume") ? ".." : ".";
// 			console.log(imgPath);
// 			img.src = imgPath + img.getAttribute("src");
// 		}
// 	});
// }