document.addEventListener('DOMContentLoaded', () => {
	const menu = document.querySelector('#mobile-menu');
	const menuLinks = document.querySelectorAll('.navbar__links');
	const menuContainer = document.querySelector('.navbar__menu');
	const contactButton = document.querySelector('.button');
	const basePath = window.location.pathname.includes("TYWeb") ? "/TYWeb" : "";

	// Close menu when a link is clicked
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (menu.classList.contains('is-active')) {
				menu.classList.remove('is-active');
				menuContainer.classList.remove('active');
			}
		});
	});

	if (contactButton) {
		contactButton.addEventListener('click', () => {
			if (menu.classList.contains('is-active')) {
				menu.classList.remove('is-active');
				menuContainer.classList.remove('active');
			}
		});
	}

	// Dynamically set the Resume link
	const github = document.querySelector("#github-contact");
	if (github) {
		github.setAttribute("href", `https://github.com/C-Gongja`);
	}
	const linkedin = document.querySelector("#linkedin-contact");
	if (linkedin) {
		linkedin.setAttribute("href", `https://www.linkedin.com/in/taeyoon-kim-477996262/`);
	}
	const resumeLink = document.querySelector("#resume-contact");
	if (resumeLink) {
		resumeLink.setAttribute("href", `${basePath}/html/resume.html`);
	}

	console.log('Resume link href:', resumeLink.getAttribute('href'));
	console.log('GitHub link href:', github.getAttribute('href'));
	console.log('LinkedIn link href:', linkedin.getAttribute('href'));
});

// Smooth scroll function
function smoothScroll(targetElement, duration) {
	const targetPosition = targetElement.offsetTop;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition - 80; // 80px offset
	let startTime = null;

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	}

	function easeOutQuad(t, b, c, d) {
		t /= d;
		return -c * t * (t - 2) + b;
	}

	requestAnimationFrame(animation);
}
