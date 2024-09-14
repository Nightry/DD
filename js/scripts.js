//Dropdown main menu
document.addEventListener('DOMContentLoaded', function () {
	const dropdowns = document.querySelectorAll('.menu-dropdown');

	dropdowns.forEach((dropdown) => {
		let timeout;

		dropdown.addEventListener('mouseenter', function () {
			clearTimeout(timeout);
			const menu = this.querySelector('.dropdown');
			menu.style.display = 'block';
			menu.style.maxHeight = menu.scrollHeight + 'px';
			menu.style.opacity = '1';
		});

		dropdown.addEventListener('mouseleave', function () {
			const menu = this.querySelector('.dropdown');
			menu.style.maxHeight = '0';
			menu.style.opacity = '0';
			timeout = setTimeout(() => {
				if (!menu.matches(':hover') && !this.matches(':hover')) {
					menu.style.display = 'none';
				}
			}, 300);
		});
	});
});

// Gallery
$(document).ready(function () {
	// Initial setup to hide all slides except the first one
	let slides = document.getElementsByClassName('gallery-slide');
	for (let i = 1; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}

	// Show the first slide
	slides[0].style.display = 'block';

	// Initialize the slide index
	let slideIndex = 0;
	let previousIndex = 0;

	// Function to show slides
	function showSlides(n) {
		let slides = document.getElementsByClassName('gallery-slide');
		let dots = document.getElementsByClassName('dot');
		if (n >= slides.length) {
			slideIndex = 0;
		}
		if (n < 0) {
			slideIndex = slides.length - 1;
		}
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
			slides[i].classList.remove('fade-in', 'fade-out');
		}
		slides[previousIndex].style.display = 'block';
		slides[previousIndex].classList.add('fade-out');
		setTimeout(() => {
			slides[previousIndex].style.display = 'none';
			slides[slideIndex].style.display = 'block';
			slides[slideIndex].classList.add('fade-in');
		}, 300);

		for (let i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(' active', '');
		}
		dots[slideIndex].className += ' active';
	}

	// Function to move slides
	function moveSlide(n) {
		previousIndex = slideIndex;
		showSlides((slideIndex += n));
	}

	// Function to set the current slide
	function currentSlide(n) {
		previousIndex = slideIndex;
		showSlides((slideIndex = n));
	}

	// Swipe functionality for mobile
	let startX;
	const slider = document.querySelector('.gallery-slider');

	slider.addEventListener('touchstart', (e) => {
		startX = e.touches[0].clientX;
	});

	slider.addEventListener('touchmove', (e) => {
		if (!startX) return;
		let moveX = e.touches[0].clientX;
		let diffX = startX - moveX;
		if (diffX > 50) {
			moveSlide(1);
			startX = null;
		} else if (diffX < -50) {
			moveSlide(-1);
			startX = null;
		}
	});

	// Automatic slide transition
	// setInterval(() => {
	// 	moveSlide(1);
	// }, 15000);

	// Expose functions to global scope for onclick handlers
	window.moveSlide = moveSlide;
	window.currentSlide = currentSlide;
});

// FAQ
document.addEventListener('DOMContentLoaded', () => {
	const faqContainer = document.querySelector('.faq-content');

	faqContainer.addEventListener('click', (e) => {
		const groupHeader = e.target.closest('.faq-group-header');
		if (!groupHeader) return;

		const group = groupHeader.parentElement;
		const groupBody = group.querySelector('.faq-group-body');
		const icon = groupHeader.querySelector('i');

		// Toggle icon
		icon.classList.toggle('fa-plus');
		icon.classList.toggle('fa-minus');

		// Toggle visibility of body with animation
		if (groupBody.classList.contains('open')) {
			$(groupBody).slideUp('slow', function () {
				groupBody.classList.remove('open');
			});
		} else {
			$(groupBody).slideDown('slow', function () {
				groupBody.classList.add('open');
			});
		}

		// Close other open FAQ bodies
		const otherGroups = faqContainer.querySelectorAll('.faq-group');

		otherGroups.forEach((otherGroup) => {
			if (otherGroup !== group) {
				const otherGroupBody = otherGroup.querySelector('.faq-group-body');
				const otherIcon = otherGroup.querySelector('.faq-group-header i');

				if (otherGroupBody.classList.contains('open')) {
					$(otherGroupBody).slideUp('slow', function () {
						otherGroupBody.classList.remove('open');
					});
					otherIcon.classList.remove('fa-minus');
					otherIcon.classList.add('fa-plus');
				}
			}
		});
	});
});

// Handle hamburger menu
const hamburgerButton = $('.hamburger-button');
const mobileMenu = $('.mobile-menu');

hamburgerButton.on('click', function () {
	mobileMenu.toggleClass('active');
	hamburgerButton.toggleClass('active');

	if (hamburgerButton.hasClass('active')) {
		hamburgerButton.html('<i class="fa-solid fa-x"></i>');
	} else {
		hamburgerButton.html('<i class="fa-solid fa-bars"></i>');
	}
});

// Handle dropdown menu on mobile
$('.menu-dropdown').on('click', function () {
	$(this).toggleClass('active');
	$(this).find('.dropdown').slideToggle('slow');
});

// Hide mobile menu when clicking a button inside it
$('.mobile-menu a').on('click', function () {
	mobileMenu.removeClass('active');
	hamburgerButton.removeClass('active');
	hamburgerButton.html('<i class="fa-solid fa-bars"></i>');
});

// Hide mobile menu when clicking outside of it, except for the fa-bars icon
$(document).on('click', function (e) {
	if (
		!$(e.target).closest('.mobile-menu, .hamburger-button').length &&
		!$(e.target).hasClass('fa-bars')
	) {
		mobileMenu.removeClass('active');
		hamburgerButton.removeClass('active');
		hamburgerButton.html('<i class="fa-solid fa-bars"></i>');
	}
});

// Hide mobile-menu when screen resizes (from small back to big)
$(window).resize(function () {
	if ($(window).width() > 1100) {
		mobileMenu.removeClass('active');
		hamburgerButton.removeClass('active');
		hamburgerButton.html('<i class="fa-solid fa-bars"></i>');
	}
});

//Mobile menu dropdown
$(document).ready(function () {
	// Dodaj obsługę kliknięcia na elementy <p> z klasą .toggle-menu
	$('.toggle-menu').click(function () {
		// Znajdź bieżącą listę (następny element po <p>)
		var currentMenu = $(this).next('.menu-list');

		// Zamknij wszystkie inne listy, z wyjątkiem tej klikniętej
		$('.menu-list').not(currentMenu).slideUp();
		$('.toggle-menu').not(this).removeClass('menu-opened');

		// Przełącz (otwórz lub zamknij) bieżące menu oraz zmień ikonę
		currentMenu.stop(true, true).slideToggle();
		$(this).toggleClass('menu-opened');
	});
});
