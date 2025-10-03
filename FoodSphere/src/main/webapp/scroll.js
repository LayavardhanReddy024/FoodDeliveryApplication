/**
 * 
 */
const carousel = document.querySelector('.carousel');
       const items = document.querySelectorAll('.carousel-item');
       const leftArrow = document.querySelector('.left-arrow');
       const rightArrow = document.querySelector('.right-arrow');
       let currentIndex = 0;

       function updateCarousel() {
           const itemWidth = items[0].offsetWidth;
           carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
       }

       rightArrow.addEventListener('click', () => {
           if (currentIndex < items.length - 1) {
               currentIndex++;
               updateCarousel();
           }
       });

       leftArrow.addEventListener('click', () => {
           if (currentIndex > 0) {
               currentIndex--;
               updateCarousel();
           }
       });

       window.addEventListener('resize', updateCarousel);

       // Initialize the carousel position
       updateCarousel();