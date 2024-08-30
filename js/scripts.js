//Dropdown menu
$(document).ready(function () {
	$('.dropdown').hide();

	$('.menu-dropdown').hover(
		function () {
			$('.dropdown').stop(true, true).slideUp('slow');
			$(this).find('.dropdown').stop(true, true).slideDown('slow');
		},
		function () {
			$(this).find('.dropdown').stop(true, true).slideUp('slow');
		}
	);
});

// News

let slideIndex = 0;
showSlides(slideIndex);

function moveSlide(n) {
	showSlides((slideIndex += n));
}

function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	let slides = document.getElementsByClassName('news-slide');
	let dots = document.getElementsByClassName('dot');
	if (n >= slides.length) {
		slideIndex = 0;
	}
	if (n < 0) {
		slideIndex = slides.length - 1;
	}
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	for (let i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(' active', '');
	}
	slides[slideIndex].style.display = 'block';
	dots[slideIndex].className += ' active';
}

// Automatic slide transition
//setInterval(() => {
//	moveSlide(1);
//}, 5000); // Change slide every 5 seconds

// FAQ
document.addEventListener('DOMContentLoaded', () => {
	const faqContainer = document.querySelector('.faq-content');

	faqContainer.addEventListener('click', (e) => {
		const groupHeader = e.target.closest('.faq-group-header');
		if (!groupHeader) return;

		const group = groupHeader.parentElement;
		const groupBody = group.querySelector('.faq-group-body');
		const icon = groupHeader.querySelector('i');

		//Toggle icon
		icon.classList.toggle('fa-plus');
		icon.classList.toggle('fa-minus');

		//Toggle visibility of body
		groupBody.classList.toggle('open');

		//Close other open FAQ bodies
		const otherGroups = faqContainer.querySelectorAll('.faq-group');

		otherGroups.forEach((otherGroup) => {
			if (otherGroup !== group) {
				const otherGroupBody = otherGroup.querySelector('.faq-group-body');
				const otherIcon = otherGroup.querySelector('.faq-group-header i');

				otherGroupBody.classList.remove('open');
				otherIcon.classList.remove('fa-minus');
				otherIcon.classList.add('fa-plus');
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

// Handle window resize
$(window).resize(function () {
	if ($(window).width() > 670) {
		mobileMenu.removeClass('active');
		hamburgerButton.removeClass('active');
		hamburgerButton.html('<i class="fa-solid fa-bars"></i>');
	}
});
