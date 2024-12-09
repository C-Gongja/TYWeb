document.addEventListener("DOMContentLoaded", () => {
	const navbarElement = document.getElementById("navbar");
	const basePath = window.location.pathname.includes("TYWeb") ? "/TYWeb" : "";

	fetch(`${basePath}/html/resume.html`)
		// fetch(`./resume.html`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to load navbar");
			}
			return response.text();
		})
		.then((data) => {
			navbarElement.innerHTML = data;

			openLinkFromResume();
			initializeModalInteractions();

			const homeLink = navbarElement.querySelector("#navbar__logo a");
			if (homeLink) {
				homeLink.setAttribute("href", `${basePath}/index.html`);
			}

			const resumeLink = navbarElement.querySelector(".navbar__item a[href='../html/resume.html']");
			if (resumeLink) {
				resumeLink.setAttribute("href", `${basePath}/html/resume.html`);
			}
		})
		.catch((error) => {
			console.error("Error loading navbar:", error);
		});
});

function openLinkFromResume() {
	const iframe = document.getElementById('resumePDF');
	iframe.addEventListener('load', function () {
		const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		if (iframeDoc) {
			const links = iframeDoc.getElementsByTagName('a');
			for (let i = 0; i < links.length; i++) {
				links[i].setAttribute('target', '_blank');
			}
		}
	});
}
