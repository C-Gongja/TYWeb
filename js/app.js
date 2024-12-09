//https://www.youtube.com/watch?v=FazgJVnrVuI&ab_channel=BrianDesign
//Undraw - pictures
// ?? - animation pictures

/* prevent to drag and right click on all images */
// Select all image elements
const images = document.querySelectorAll('img');

// Add the oncontextmenu and ondragstart attributes to each image
images.forEach(img => {
	img.oncontextmenu = () => false;
	img.ondragstart = () => false;
});

/* when use click a menu from mobile navbar, the navbar will remove*/
document.addEventListener('DOMContentLoaded', function () {
	const menu = document.querySelector('#mobile-menu');
	const menuLinks = document.querySelectorAll('.navbar__links');
	const menuContainer = document.querySelector('.navbar__menu');
	const contactButton = document.querySelector('.button');

	menu.addEventListener('click', function () {
		menu.classList.toggle('is-active');
		menuContainer.classList.toggle('active');
	});

	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (menu.classList.contains('is-active')) {
				menu.classList.remove('is-active');
				menuContainer.classList.remove('active');
			}
		});
	});

	contactButton.addEventListener('click', () => {
		if (menu.classList.contains('is-active')) {
			menu.classList.remove('is-active');
			menuContainer.classList.remove('active');
		}
	});

	// Dynamically set the Resume link
	const resumeLink = document.querySelector("#resume-contact");
	if (resumeLink) {
		resumeLink.setAttribute("href", `${basePath}/html/resume.html`);
	}

});

/*
Smooth scroll effect
*/
document.querySelectorAll('.navbar__links').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault(); // 기본 동작 중지
		var target = this.getAttribute('href');
		var duration = 1000; // 스크롤 지속 시간 (1초)
		smoothScroll(target, duration);
	});
});

document.querySelectorAll('.button').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault(); // 기본 동작 중지
		var target = this.getAttribute('href');
		var duration = 1000; // 스크롤 지속 시간 (1초)
		smoothScroll(target, duration);
	});
});

// 부드러운 스크롤 함수
function smoothScroll(target, duration) {
	var targetElement = document.querySelector(target);
	// targetElement.getBoundingClientRect().top for better accuracy
	// But it's not working properly, when I click the same link twice it returns to Home
	var targetPosition = targetElement.offsetTop;
	var startPosition = window.pageYOffset;
	var distance = targetPosition - startPosition - 80; // 80px offset
	var startTime = null;
	var easing = function (t, b, c, d) {
		t /= d;
		return -c * t * (t - 2) + b; // easeOutQuad easing 함수
	};

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime;
		var timeElapsed = currentTime - startTime;
		var run = easing(timeElapsed, startPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		} else {
			window.scrollTo(0, startPosition + distance); // 애니메이션이 끝나면 목표 위치로 정확히 맞춤
		}
	}

	// Start animation
	requestAnimationFrame(animation);
}

/*
skills tab
*/
// document.addEventListener('DOMContentLoaded', function () {
// 	const tabs = document.querySelectorAll('input[name="tab"]');
// 	const tabContents = document.querySelectorAll('.tab-pane');
// 	const marker = document.querySelector('.marker');
// 	const labels = document.querySelectorAll('label[for^="tab"]'); // 라벨 선택

// 	function showTabContent(index) {
// 		tabContents.forEach((content, i) => {
// 			if (i === index) {
// 				content.classList.add('active');
// 			} else {
// 				content.classList.remove('active');
// 			}
// 		});

// 		const label = labels[index];
// 		const labelRect = label.getBoundingClientRect();

// 		marker.style.top = `${label.offsetTop}px`;
// 		marker.style.height = `${labelRect.height}px`;
// 	}

// 	tabs.forEach((tab, index) => {
// 		tab.addEventListener('change', () => {
// 			showTabContent(index);
// 		});
// 	});

// 	// Show the first tab content by default
// 	showTabContent(0);
// });

