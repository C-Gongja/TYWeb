document.addEventListener("DOMContentLoaded", () => {
	const navbarElement = document.getElementById("projects");

	fetch("./html/projects.html")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to load projects");
			}
			return response.text();
		})
		.then((data) => {
			navbarElement.innerHTML = data; // Insert the content from projects.html
			// initializeModals();
			initializeModalInteractions();
			initializeScrollButtons();
			cardFrontBackground();

			initializeTabFunctionality();
		})
		.catch((error) => {
			console.error("Error loading projects:", error);
		});
});


// Cards front background
function cardFrontBackground() {
	document.querySelectorAll('.card-front').forEach(card => {
		const bg = card.getAttribute('data-bg');
		card.style.backgroundImage = `url('${bg}')`;
	});
}


// Scroll functionality
function initializeScrollButtons() {
	const container = document.querySelector('.projects__container');
	const leftButton = document.querySelector('.scroll-button.left');
	const rightButton = document.querySelector('.scroll-button.right');

	if (!container || !leftButton || !rightButton) {
		console.error("Scroll elements not found!");
		return;
	}

	// Scroll left
	leftButton.addEventListener('click', () => {
		container.scrollBy({
			left: -1500, // Adjust based on your card width
			behavior: 'smooth',
		});
	});

	// Scroll right
	rightButton.addEventListener('click', () => {
		container.scrollBy({
			left: 1500, // Adjust based on your card width
			behavior: 'smooth',
		});
	});

	// Update button visibility based on scroll position
	function updateArrowVisibility() {
		const maxScrollLeft = container.scrollWidth - container.clientWidth;

		leftButton.style.display = container.scrollLeft <= 0 ? 'none' : 'block';
		rightButton.style.display = container.scrollLeft >= maxScrollLeft ? 'none' : 'block';
	}

	container.addEventListener('scroll', updateArrowVisibility);

	// Initialize visibility
	updateArrowVisibility();
}

// Function to initialize tab switching after loading the HTML
function initializeTabFunctionality() {
	document.querySelectorAll('.tab-item').forEach(item => {
		item.addEventListener('click', function () {
			const selectedCategory = this.getAttribute('data-tab');

			document.querySelectorAll('.card').forEach(card => {
				const categories = card.getAttribute('data-category').split(',').map(cat => cat.trim());

				if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
					card.style.visibility = 'visible';
					card.style.position = 'static';
				} else {
					card.style.visibility = 'hidden';
					card.style.position = 'absolute';
				}
			});

			document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
			this.classList.add('active');
		});
	});

	// 기본 탭 설정 (All)
	document.querySelector('.tab-item[data-tab="all"]').click();
}
