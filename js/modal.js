document.addEventListener("DOMContentLoaded", () => {
	const modalElement = document.getElementById("modals");
	const basePath = window.location.pathname.includes("TYWeb") ? "/TYWeb" : "";

	// Fetch the modal content dynamically
	// fetch("./html/modal.html")
	fetch(`${basePath}/html/modal.html`)
		.then(response => {
			if (!response.ok) throw new Error("Failed to load modal content");
			return response.text();
		})
		.then(data => {
			modalElement.innerHTML = data; // Insert fetched content
			// initializeModals();
			// initializeDropdownModalLinks();
			initializeModalInteractions();
			loadAssets();
		})
		.catch(error => console.error("Error loading modal content:", error));
});

// // Modal functionality after dynamic content load
// function initializeModals() {
// 	const cards = document.querySelectorAll('.card[data-target]'); // Select all cards
// 	const modals = document.querySelectorAll('.modal'); // Select all modals
// 	const closeBtns = document.querySelectorAll('.close-btn'); // Select all close buttons

// 	// Add event listeners to cards for opening modals
// 	cards.forEach(card => {
// 		card.addEventListener('click', function () {
// 			const modalId = card.getAttribute('data-target'); // Get modal ID
// 			const modal = document.getElementById(modalId); // Find modal by ID

// 			if (modal) {
// 				modal.style.opacity = '1';
// 				modal.style.pointerEvents = 'auto';
// 				document.body.classList.add('no-scroll'); // Prevent scrolling on background
// 			}
// 		});
// 	});

// 	// Add event listeners to close buttons for closing modals
// 	closeBtns.forEach(btn => {
// 		btn.addEventListener('click', function () {
// 			const modal = btn.closest('.modal'); // Find the closest modal
// 			if (modal) {
// 				modal.style.opacity = '0';
// 				modal.style.pointerEvents = 'none';
// 				document.body.classList.remove('no-scroll'); // Allow scrolling
// 			}
// 		});
// 	});

// 	// Close modal when clicking outside of it
// 	window.addEventListener('click', function (e) {
// 		modals.forEach(modal => {
// 			if (e.target === modal) {
// 				modal.style.opacity = '0';
// 				modal.style.pointerEvents = 'none';
// 				document.body.classList.remove('no-scroll'); // Allow scrolling
// 			}
// 		});
// 	});
// }

// // Function to handle dropdown menu clicks
// function initializeDropdownModalLinks() {
// 	const dropdownLinks = document.querySelectorAll('.dropdown__links'); // Select all dropdown links
// 	const modals = document.querySelectorAll('.modal'); // Select all modals
// 	let currentlyOpenModal = null; // Track the currently open modal

// 	// Add event listener to each dropdown link
// 	dropdownLinks.forEach(link => {
// 		link.addEventListener('click', function (event) {
// 			event.preventDefault(); // Prevent default anchor click behavior

// 			const modalId = link.getAttribute('data-target'); // Get modal ID from data-target
// 			const modal = document.getElementById(modalId); // Find modal by ID

// 			if (modal) {
// 				// Close the currently open modal (if any)
// 				if (currentlyOpenModal && currentlyOpenModal !== modal) {
// 					currentlyOpenModal.style.opacity = '0';
// 					currentlyOpenModal.style.pointerEvents = 'none';
// 				}
// 				currentlyOpenModal = null;

// 				// Open the new modal
// 				modal.style.opacity = '1';
// 				modal.style.pointerEvents = 'auto';
// 				document.body.classList.add('no-scroll'); // Prevent scrolling on background

// 				// Update the currently open modal tracker
// 				currentlyOpenModal = modal;
// 			}
// 		});
// 	});

// 	// Close modal when clicking outside or on close button
// 	modals.forEach(modal => {
// 		const closeBtn = modal.querySelector('.close-btn');
// 		closeBtn.addEventListener('click', function () {
// 			modal.style.opacity = '0';
// 			modal.style.pointerEvents = 'none';
// 			document.body.classList.remove('no-scroll');

// 			// Clear the currently open modal tracker
// 			if (currentlyOpenModal === modal) {
// 				currentlyOpenModal = null;
// 			}
// 		});
// 	});

// 	window.addEventListener('click', function (e) {
// 		modals.forEach(modal => {
// 			if (e.target === modal) {
// 				modal.style.opacity = '0';
// 				modal.style.pointerEvents = 'none';
// 				document.body.classList.remove('no-scroll');

// 				// Clear the currently open modal tracker
// 				if (currentlyOpenModal === modal) {
// 					currentlyOpenModal = null;
// 				}
// 			}
// 		});
// 	});
// }

function initializeModalInteractions() {
	const modals = document.querySelectorAll('.modal'); // Select all modals
	const closeBtns = document.querySelectorAll('.close-btn'); // Select all close buttons
	const cards = document.querySelectorAll('.card[data-target]'); // Select all cards
	const dropdownLinks = document.querySelectorAll('.dropdown__links'); // Select all dropdown links
	let currentlyOpenModal = null; // Track the currently open modal

	// Generic function to open a modal
	function openModal(modal) {
		if (modal) {
			// Close the currently open modal (if any)
			if (currentlyOpenModal && currentlyOpenModal !== modal) {
				closeModal(currentlyOpenModal);
			}

			modal.style.opacity = '1';
			modal.style.pointerEvents = 'auto';
			document.body.classList.add('no-scroll');
			currentlyOpenModal = modal;
		}
	}

	// Generic function to close a modal
	function closeModal(modal) {
		if (modal) {
			modal.style.opacity = '0';
			modal.style.pointerEvents = 'none';
			document.body.classList.remove('no-scroll');

			// Clear the currently open modal tracker
			if (currentlyOpenModal === modal) {
				currentlyOpenModal = null;
			}
		}
	}

	// Add event listeners to cards and dropdown links
	[...cards, ...dropdownLinks].forEach(element => {
		element.addEventListener('click', function (event) {
			event.preventDefault(); // Prevent default behavior
			const modalId = element.getAttribute('data-target'); // Get modal ID
			const modal = document.getElementById(modalId); // Find modal by ID
			openModal(modal);
		});
	});

	// Add event listeners to close buttons
	closeBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			const modal = btn.closest('.modal'); // Find the closest modal
			closeModal(modal);
		});
	});

	// Close modal when clicking outside of it
	window.addEventListener('click', function (e) {
		modals.forEach(modal => {
			if (e.target === modal) {
				closeModal(modal);
			}
		});
	});
}

function loadAssets() {
	const images = document.querySelectorAll("img[src]");
	const sources = document.querySelectorAll("source[src]");

	images.forEach(img => {
		const basePath = window.location.pathname.includes("resume") ? ".." : ".";
		img.src = basePath + img.getAttribute("src");
	});

	sources.forEach(source => {
		const basePath = window.location.pathname.includes("resume") ? ".." : ".";
		const sourcePath = source.getAttribute("src");  // source의 src 속성값을 가져옴
		if (sourcePath) {
			source.src = basePath + sourcePath;  // 경로를 basePath와 합쳐서 설정
		}
	});
}
