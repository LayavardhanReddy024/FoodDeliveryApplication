/**
 * 
 */
// Script for search button
document.getElementById('searchButton').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput');
    searchInput.classList.toggle('open');
    searchInput.focus();
});

// Script for login and register drop-down
 // Toggle the dropdown visibility for the Login button
 document.getElementById("loginBtn").onclick = function() {
    document.getElementById("loginDropdown").classList.toggle("show");
    document.getElementById("registerDropdown").classList.remove("show");
};

// Toggle the dropdown visibility for the Register button
document.getElementById("registerBtn").onclick = function() {
    document.getElementById("registerDropdown").classList.toggle("show");
    document.getElementById("loginDropdown").classList.remove("show");
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.cta-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content-1 , dropdown-content-2");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};


// General slider animation
let currentIndex = 0;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const totalSlides = document.querySelectorAll('.slider-item').length;

    currentIndex = (index + totalSlides) % totalSlides; // Loop slides

    const offset = -currentIndex * 100; // Shift slider by 100% for each slide
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlideItem() {
    showSlide(currentIndex + 1);
}

function previousSlideItem() {
    showSlide(currentIndex - 1);
}

// Carousel animation
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let carouselIndex = 0;

function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const gap = 15; // Adjust gap between items if needed
    carousel.style.transform = `translateX(-${carouselIndex * (itemWidth + gap)}px)`;
}

rightArrow.addEventListener('click', () => {
    if (carouselIndex < items.length - 6) {
        carouselIndex++;
        updateCarousel();
    }
});

leftArrow.addEventListener('click', () => {
    if (carouselIndex > 0) {
        carouselIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

// Sliding animation for Top Restaurants
let restaurantIndex = 0;

function showRestaurantSlide(index) {
    const slider = document.querySelector('.slider1');
    const slideWidth = document.querySelector('.Resturant-container').offsetWidth;

    restaurantIndex = (index + getTotalRestaurantSlides()) % getTotalRestaurantSlides();

    const transformValue = -(restaurantIndex * slideWidth) / 4.4; // Adjust factor if needed
    slider.style.transform = `translateX(${transformValue}px)`;
}

function prevRestaurantSlide() {
    showRestaurantSlide(restaurantIndex - 1);
}

function nextRestaurantSlide() {
    showRestaurantSlide(restaurantIndex + 1);
}

function getTotalRestaurantSlides() {
    return document.querySelectorAll('.slider1 img').length;
}

// Initial setup for all sliders
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex); // Initialize general slider
    updateCarousel(); // Initialize carousel
    showRestaurantSlide(restaurantIndex); // Initialize restaurant slider
});



// script for View more button
  function toggleContent() {
            var moreContent = document.querySelector('.more-content');
            var readMoreButton = document.querySelector('.button');
            
            if (moreContent.style.display === 'none') {
                moreContent.style.display = 'grid';
                readMoreButton.textContent = 'View Less';
            } else {
                moreContent.style.display = 'none';
                readMoreButton.textContent = 'View More';
            }
        }

// script for About section
document.getElementById('AboutUsBtn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
});

// Script for contact us Section
document.getElementById('contactUsBtn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
});